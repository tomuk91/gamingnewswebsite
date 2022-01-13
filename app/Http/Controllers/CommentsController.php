<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Services\Comment\PostComments;
use App\Http\Requests\CommentsRequest;
use App\Services\Comment\CreateComment;

class CommentsController extends Controller
{

    public function store(CommentsRequest $request, CreateComment $comment )
    {
        $action = $comment->createComment($request);

        if($action) {
            return response()->json(['message' => 'comment created!'], 200);
        } else {
            return response()->json(['error' => 'unable to create comment'], 400);
        }
    }

    public function getPostComments(request $request, PostComments $comments)
    {
        $action = $comments->postComments($request);

        if ($action) {
            return response()->json($action, 200);
        } else {
            return response()->json(['message' => "Post not found", 'status' => 404], 404);
        }
    }
}
