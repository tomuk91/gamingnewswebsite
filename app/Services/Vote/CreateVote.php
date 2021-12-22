<?php

namespace App\Services\Vote;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\Vote;

class CreateVote
{

    public function create($request)
    {
        $user_id = Auth::User()->id;
        $post_id = $request->post_id;
        $post = Post::find($post_id);

        $vote = Vote::updateOrCreate(
            [
                'user_id' => $user_id,
                'post_id' => $request->post_id,
            ],
            ['status' => '1']
        );

        if ($vote->wasRecentlyCreated) {
            $post->increment('upvotes', 1);
            $post->save();
            $totalLikes = $post->select('upvotes')->count('upvotes');
            if($totalLikes >= 10) {
                $post->pending = false;
                $post->save();
            }
            return 'Voted';
        } else {
            Vote::where('post_id', $post_id)->where('user_id', $user_id)->delete();
            $post->decrement('upvotes', 1);
            $post->save();
        }
    }
}
