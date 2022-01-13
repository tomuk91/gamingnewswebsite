<?php

namespace App\Services\User;
use App\Models\Post;
use App\Models\Vote;
use App\Models\Comment;


use Illuminate\Support\Facades\Auth;

class UserStats {

    public function getStats()
    {
        $user_id = Auth::user()->id;

        if(!$user_id) return;

        $postsCount = Post::where('user_id', $user_id)->count();
        $likesCount = Vote::where('user_id', $user_id)->count();
        $commentsCount = Comment::where('user_id', $user_id)->count();

        return response(['post_count' => $postsCount, 'like_count' => $likesCount,
                        'comment_count' => $commentsCount]);
    }
}
