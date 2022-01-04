<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Services\Post\CreateUpdatePost;
use App\Services\Post\PostCurrentUser;
use App\Services\Post\PostById;
use App\Services\Post\PostsByCategory;
use App\Services\Post\LatestApproved;

class PostsController extends Controller
{

    public function index()
    {
        $posts = Post::with('categories')->get();
        return $posts;
    }

    public function pendingPosts(Request $request) {

        $pageOffset = (isset($request->pageOffset)) ? (int) $request->pageOffset : 10;
        $orderBy = (isset($request->orderBy)) ? $request->orderBy : 'desc';
        $user_id = auth('api')->user()->id ?? NULL;


        $post = Post::where('pending', '1')->orderBy('created_at', $orderBy)->with(['votes' => function ($subQuery) use ($user_id) {
            return $subQuery->where('user_id', $user_id);
        }])->paginate($pageOffset);

        if($post) {
            return $post;
        } else {
            return 'No pending posts';
        }
    }

    public function currentUserPosts(request $request, PostCurrentUser $post)
    {
        $action = $post->currentUser($request);

        return response()->json($action, 200);
    }

    public function postById(request $request, PostById $post)
    {
        $action = $post->PostId($request);

        if ($action) {
            return response()->json($action, 200);
        } else {
            return response()->json('Post Not Found', 404);
        }
    }

    public function latestApprovedPosts(request $request, LatestApproved $post) {

        $action = $post->latestApprovedPost($request);

        return response()->json($action, 200);
    }

    public function postsByCategory(Request $request, PostsByCategory $post)
    {
        $action = $post->getPosts($request);
        if ($action) {
            return $action;
        } else {
            return response()->json(['message' => 'Unable to find posts', 404]);
        }
    }

    public function store(Request $request, CreateUpdatePost $store)
    {

        $action = $store->create($request);

        if ($action) {
            return response()->json(['message' => 'Post Created!', 'post_id' => $action, 200]);
        } else {
            return response()->json('There was a problem creating your post!', 400);
        }
    }
}
