<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class PendingPosts
{

    public function pending($request)
    {

        $pageOffset = (isset($request->pageOffset)) ? (int) $request->pageOffset : 10;
        $orderBy = (isset($request->orderBy)) ? $request->orderBy : 'desc';
        $user_id = auth('api')->user()->id ?? NULL;


        $post = Post::where('pending', '1')->orderBy('created_at', $orderBy)->with(['votes' => function ($subQuery) use ($user_id) {
            return $subQuery->where('user_id', $user_id);
        }])->paginate($pageOffset);

        if($post) {
            return $post;
        }
    }
}
