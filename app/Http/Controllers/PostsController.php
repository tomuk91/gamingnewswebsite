<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\Post;
use App\Services\Post\PostCurrentUser;
use App\Services\Post\PostById;



class PostsController extends Controller
{

    public function getPosts()
    {
        return response()->json(Post::all(), 200);
    }

    public function currentUserPosts(PostCurrentUser $post)
    {
       $action = $post->currentUser();

        return response()->json($action, 200);
    }

    public function postById(request $request, PostById $post)
    {
        $action = $post->PostId($request);

        if($action) {
            return response()->json($action, 200);
        } else {
            return response()->json('Post Not Found', 404);
        }
    }

}