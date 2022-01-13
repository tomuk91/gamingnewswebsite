<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use App\Services\Category\CreateUpdateCategory;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Categories::where('parent_id', '0')->orWhere('parent_id', NULL)
        ->with('subCategories')->get();
        return $categories;
    }

    public function store(Request $request, CreateUpdateCategory $category)
    {
        $action = $category->create($request);

        if($action){
            return response()->json('Category Created!', 200);
        } else {
            return response()->json('There was a problem creating the category', 400);
        }
    }
}
