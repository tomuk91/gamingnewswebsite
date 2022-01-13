<?php

namespace App\Services\Messages;
use App\Models\Messages;


use Illuminate\Support\Facades\Auth;

class ReplyToConversation {

    public function createReply($request)
    {
        $user_id = Auth::user()->id;

        $message = Messages::create([
            'message' => encrypt($request->message),
            'conversation_id' => $request->conversation_id,
            'user_id' => $user_id,
        ]);

        $message->save();

        return $message;

    }
}
