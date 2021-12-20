<?php

namespace App\Services\Vote;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Vote;

class CreateVote
{

    public function create($request)
    {
        $user_id = Auth::User()->id;
        $post_id = $request->post_id;

        $vote = Vote::updateOrCreate(
            [
                'user_id' => $user_id,
                'post_id' => $request->post_id,
            ],
            ['status' => '1']
        );

        if ($vote->wasRecentlyCreated) {
            DB::table('posts')->increment('upvotes', 1);
            return 'Voted';
        } else {
            Vote::where('post_id', $post_id)->where('user_id', $user_id)->delete();
            DB::table('posts')->decrement('upvotes', 1);
        }
    }
}
