<?php

namespace App\Http\Controllers;

use App\Models\Votes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class VotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = Auth::User()->id;
        $post_id = $request->post_id;

        $vote = Votes::updateOrCreate(
            [
                'user_id' => $user_id,
                'post_id' => $request->post_id,
            ],
            ['status' => '0']
        );
        if ($vote->wasRecentlyCreated) {
            DB::table('posts')->increment('upvotes', 1);
            return response()->json(['message' => 'voted!', 200]);
        } else {
            Votes::where('post_id', $post_id)->where('user_id', $user_id)->delete();
            DB::table('posts')->decrement('upvotes', 1);
            return response()->json(['message' => 'Vote Removed!', 200]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Votes  $votes
     * @return \Illuminate\Http\Response
     */
    public function show(Votes $votes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Votes  $votes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Votes $votes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Votes  $votes
     * @return \Illuminate\Http\Response
     */
    public function destroy(Votes $votes)
    {
        //
    }
}
