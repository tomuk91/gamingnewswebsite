<?php

namespace App\Services\Post;

use App\Models\Post;

class PostById {

    public function PostId($request) {

        $post_id = $request->post_id;

        return Post::with('categories')->where('id', $post_id)->first();
    }
}
