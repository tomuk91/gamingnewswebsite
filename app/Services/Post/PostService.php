<?php

namespace App\Services\Post;

use Illuminate\Support\Facades\Auth;
use App\Models\Post;

use Throwable;

class PostService {

    public function currentUser() {

        if(!Auth::user()) {
            return;
        }

        $user_id = Auth::user()->id;

        $post = Post::where('user_id', '=', $user_id)->get();

        if($post) {
            return $post;
        } else {
            return 'No posts associated with this user';
        }
    }

    public function postId($request) {


    }

}
