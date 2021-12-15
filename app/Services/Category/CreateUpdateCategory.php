<?php

namespace App\Services\Category;

use App\Models\Categories;
use App\Models\Post;
use App\Models\Comment;
use Error;

class CreateUpdateCategory
{

    public function create($request)
    {
        $category = Categories::create([
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id ?? NULL,
        ]);

        if ($category) {
            return $category;
        }
    }
}
