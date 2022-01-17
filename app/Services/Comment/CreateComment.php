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

        switch($commentCount) {
            case 1000:
                $user->accolades()->syncWithoutDetaching(5);
            break;
            case 500:
                $user->accolades()->syncWithoutDetaching(4);
            break;
            case 100:
                $user->accolades()->syncWithoutDetaching(3);
            break;
            case 50:
                $user->accolades()->syncWithoutDetaching(2);
            break;
            case 39:
                $user->accolades()->syncWithoutDetaching(1);
            break;
        }
        return $comment;
    }
}
