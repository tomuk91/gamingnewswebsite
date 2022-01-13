<?php

namespace App\Services\Post;

use Illuminate\Support\Carbon;
use App\Models\Post;

use Throwable;

class FeaturedPosts {

    public function GetFeaturedPosts() {

        $posts = Post::withCount(['votes' => function ($query) {
            $query->where('upvotes', '>=', Carbon::now()->subDay());
        }])->orderBy('votes_count', 'DESC')->limit(3)->get();

        return $posts;
    }
}
