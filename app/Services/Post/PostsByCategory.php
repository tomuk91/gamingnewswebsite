<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class PostsByCategory
{

    public function getPosts($request)
    {
        $categoryId = $request->id;

        $posts = Post::whereHas('categories', function ($qbCategory) use ($categoryId) {
            $qbCategory->where('id', $categoryId);
        })->with('categories', function ($sub) use ($categoryId) {
            $sub->where('id', $categoryId);
        })->orderBy('created_at', 'desc')->get();


        return $posts;
    }
}
