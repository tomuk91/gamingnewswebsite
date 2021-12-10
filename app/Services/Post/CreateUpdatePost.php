<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class CreateUpdatePost
{

    public function create($request)
    {
        $user_id = Auth::user()->id;

        $post = Post::create([
            'title' => $request->title,
            'summary' => $request->summary,
            'image_url' => $request->url,
            'website' => $request->website,
            'user_id' => $user_id,
            'upvotes' => '0',
            'pending' => '1',
            'is_featured' => '0'
        ]);

        
    }
}
