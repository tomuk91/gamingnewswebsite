<?php

namespace App\Services\Post;

use Illuminate\Support\Facades\Auth;
use App\Models\Post;

class PostCurrentUser {

    public function currentUser($request) {

        if(!Auth::user()) {
            return;
        }

        $user_id = Auth::user()->id;
        $pageOffset = (isset($request->pageOffset)) ? (int) $request->pageOffset : 10;
        $orderBy = (isset($request->orderBy)) ? $request->orderBy : 'desc';

        $post = Post::with('categories')->where('user_id', $user_id)->orderBy('created_at', $orderBy)->paginate($pageOffset);
        return $post;

        if($post) {
            return $post;
        } else {
            return 'No posts associated with this user';
        }
    }
}


