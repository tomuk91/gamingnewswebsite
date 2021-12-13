<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Services\Post\CreateUpdatePost;
use App\Services\Post\PostCurrentUser;
use App\Services\Post\PostById;





class PostsController extends Controller
{

    public function index()
    {
        $posts = Post::with('categories')->get();

        return $posts;
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

    public function store(Request $request, CreateUpdatePost $store) {

        $action = $store->create($request);

        if($action) {
            return response()->json('Post Created!', 200);
        } else {
            return response()->json('There was a problem creating your post!', 400);
        }
    }

}
