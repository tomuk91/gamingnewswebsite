<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ForgotController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VotesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User CRUD Operations

Route::post('/logout', [UserController::class, 'logout']);

Route::post('/update{id}', [UserController::class, 'update']);

Route::delete('/delete', [UserController::class, 'delete']);

Route::get('/getLoggedInuser', [UserController::class, 'getLoggedInuser']);

Route::post('/createpost', [PostsController::class, 'store']);

Route::post('vote', [VotesController::class, 'store']);


Route::group([
    'prefix' => 'forgot-password',
    'excluded_middleware' => ['auth:api'],
], function () {
    Route::post('/forgot', [ForgotController::class, 'forgot']);
    Route::post('/reset', [ForgotController::class, 'reset']);
});

Route::group([
    'excluded_middleware' => ['auth:api'],
], function () {
    Route::get('/postbyid', [PostsController::class, 'postById']);
    Route::get('/getpostcomments', [CommentsController::class, 'getPostComments']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/contact', [MailController::class, 'contact']);
    Route::get('category', [CategoriesController::class, 'index']);
    Route::post('createcategory', [CategoriesController::class, 'store']);
    Route::get('posts', [PostsController::class, 'index']);
});

Route::post('createcomment', [CommentsController::class, 'store']);

// Post CRUD operations
Route::get('/currentuserposts', [PostsController::class, 'currentUserPosts']);

Route::get('/postbyuser', [PostsController::class, 'postByUser']);


// File CRUD Operations
Route::post('/profileImage', [FileController::class, 'saveProfileImage']);


// Get specific post
Route::get('/posts/{user_id}', [PostsController::class, 'getPostByUserId']);
