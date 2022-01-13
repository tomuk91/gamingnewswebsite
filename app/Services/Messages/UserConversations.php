<?php

namespace App\Services\Messages;
use App\Models\Conversations;


use Illuminate\Support\Facades\Auth;

class UserConversations {

    public function getConversations()
    {
        $user_id = Auth::user()->id;

        $userConversations = Conversations::where('user_one', $user_id)->orWhere('user_two', $user_id)->with('creator')->with('userTwo')->get();

        return $userConversations;
    }
}
