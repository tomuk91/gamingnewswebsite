<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Services\Comment\PostComments;
use App\Http\Requests\CommentsRequest;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{

    public function store(CommentsRequest $request)
    {

        $id = Auth::user()->id;

        $comment = new Comment;
        $comment->fill($request->all());
        $comment->user_id = $id;
        $comment->save();

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
