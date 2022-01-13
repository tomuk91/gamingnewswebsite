<?php

namespace App\Services\Messages;
use App\Models\Conversations;


use Illuminate\Support\Facades\Auth;

class ConversationMessages  {

    public function getMessages($request)
    {
        $user_id = Auth::user()->id;
        $conversation_id = $request->conversation_id;

        $conversation = Conversations::where('user_one', $user_id)->orWhere('user_two', $user_id)->with('messages', function ($subQuery) use ($conversation_id) {
            $subQuery->where('conversation_id', $conversation_id)->with('sender');})->get();

        $messages = $conversation->pluck('messages')->flatten();

        foreach($messages as $message) {
            if($message->user_id != $user_id) {
                $message->is_seen = true;
                $message->save();
            }
            $message->save();
        }
        return $messages;
    }
}
