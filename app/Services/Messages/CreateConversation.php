<?php

namespace App\Services\Messages;
use App\Models\Conversations;
use App\Models\Messages;


use Illuminate\Support\Facades\Auth;

class CreateConversation {

    public function create($request)
    {
        $user_id = Auth::user()->id;

        $conversation = Conversations::create([
           'subject' => $request->subject,
           'user_one' => $user_id,
           'user_two' => $request->recipient,
           'created_by' => $user_id,
        ]);
        $conversation->save();
        if(!$conversation->id) return;

        $conversation_id = $conversation->id;

        $message = Messages::create([
            'message' => encrypt($request->message),
            'conversation_id' => $conversation_id,
            'user_id' => $user_id,
        ]);
        $message->save();

        if($conversation->id && $message->id) {
            return true;
        }
    }
}
