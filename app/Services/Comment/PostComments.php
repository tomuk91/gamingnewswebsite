<?php

namespace App\Services\Comment;

use App\Models\Post;
use App\Models\Comment;


class PostComments {

    public function postComments($request) {
        $post_id = $request->post_id;

        if (!Comment::where('post_id', $post_id)) {
            return;
        } else {
            return Comment::where('parent_id', '=', 0)->with('user.userProfilePicture')->where('post_id', $post_id)
            ->with('replies.user.userProfilePicture')->get();
        }
    }
}
