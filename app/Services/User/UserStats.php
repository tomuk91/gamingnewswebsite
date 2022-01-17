<?php

namespace App\Services\User;
use App\Models\Post;
use App\Models\Vote;
use App\Models\Comment;
use Illuminate\Http\Client\Request;


use Illuminate\Support\Facades\Auth;

class UserStats {

    public function getStats($request)
    {
        $user_id = null;

        if($request->public == 'false') {
            $this->user_id = Auth::user()->id;
        } else {
            $this->user_id = $request->userId;
        }

        $postsCount = Post::where('user_id', $this->user_id)->count();
        $likesCount = Vote::where('user_id', $this->user_id)->count();
        $commentsCount = Comment::where('user_id', $this->user_id)->count();

        return response(['post_count' => $postsCount, 'like_count' => $likesCount,
                        'comment_count' => $commentsCount]);
    }
}
