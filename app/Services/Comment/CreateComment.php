<?php

namespace App\Services\Comment;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class CreateComment {

    public function createComment($request) {

        $userId = Auth::user()->id;

        $user = User::find($userId);

        $comment = new Comment;
        $comment->fill($request->all());
        $comment->user_id = $userId;
        $comment->save();


        $commentCount = Comment::where('user_id', $userId)->count();
        if($commentCount = 3) {
            $user->accolades()->sync(1);
        }

        return $comment;
    }
}
