<?php

namespace App\Services\Post;

use App\Models\Post;

class PostById {

    public function PostId($request) {

        $post_id = $request->post_id;
        $user_id = auth('api')->user()->id;

        $post = Post::with('categories')->where('id', $post_id)->with(['votes' => function ($subQuery) use ($user_id) {
            return $subQuery->where('user_id', $user_id);
        }])->first();

        return $post;

    }
}
