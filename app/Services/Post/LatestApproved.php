<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class LatestApproved {

    public function latestApprovedPost($request) {

        $pageOffset = (isset($request->pageOffset)) ? (int) $request->pageOffset : 10;
        $orderBy = (isset($request->orderBy)) ? $request->orderBy : 'desc';
        $user_id = auth('api')->user()->id ?? null;

        $post = Post::with('categories')->where('pending', '==', '0' || null)->with(['votes' => function ($subQuery) use ($user_id) {
            return $subQuery->where('user_id', $user_id);}])->orderBy('created_at', $orderBy)->paginate($pageOffset);

        if($post == null) return;
        
        return $post;

    }
}
