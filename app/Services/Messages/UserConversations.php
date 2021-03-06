<?php

namespace App\Services\Messages;
use App\Models\Conversations;


use Illuminate\Support\Facades\Auth;

class UserConversations {

    public function getConversations()
    {
        $user_id = Auth::user()->id;

        $userConversations = Conversations::where('user_one', $user_id)->orWhere('user_two', $user_id)->with(['messages' => function ($query) use ($user_id) {
            return $query->where('user_id', '!=', $user_id)->where('is_seen', '=', '0');}])->with('creator')->with('userTwo')->get();

        return $userConversations;
    }
}
