<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class CreateUpdatePost
{

    public function create($request)
    {
        $user_id = Auth::user()->id;
        $categories = $request->categories;

        $upvotes = 0;

        $post = Post::create([
            'title' => $request->title,
            'summary' => $request->summary,
            'image_url' => $request-> image,
            'url' => $request->url,
            'website' => $request->website,
            'user_id' => $user_id,
            'upvotes' => 0,
            'pending' => 1,
            'is_featured' => 0
        ]);

        $post->save();
        $post->categories()->attach($categories);

        if($post) {
            return $post->id;
        }
    }
}
