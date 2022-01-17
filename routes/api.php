<?php

use App\Http\Controllers\AccoladeController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ForgotController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\MessagesController;
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



// POSTS & VOTES
    //POST
Route::post('/createpost', [PostsController::class, 'store']);
Route::post('vote', [VotesController::class, 'store']);
Route::post('createcategory', [CategoriesController::class, 'store']);
    //GET
Route::get('/currentuserposts', [PostsController::class, 'currentUserPosts']);
Route::get('/postbyuser', [PostsController::class, 'postByUser']);
Route::get('/posts/{user_id}', [PostsController::class, 'getPostByUserId']);


//USER & PROFILE
    //POST
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api');
Route::post('/update{id}', [UserController::class, 'update']);
    //GET
Route::get('/getLoggedInuser', [UserController::class, 'getLoggedInuser']);
Route::get('stats', [UserController::class, 'stats']);
Route::get('profiledata', [UserController::class, 'getProfileData']);
    //DELETE
Route::delete('/delete', [UserController::class, 'delete']);



// MESSAGES & CONVERSATIONS
    //POST
Route::post('sendmessage', [MessagesController::class, 'sendMessage']);
Route::post('createconversation', [MessagesController::class, 'createConversation']);
Route::post('reply', [MessagesController::class, 'reply']);
Route::post('createcomment', [CommentsController::class, 'store']);
    //GET
Route::get('conversation', [MessagesController::class, 'conversation']);
Route::get('messages', [MessagesController::class, 'messagesByConversation']);
Route::get('messagecheck', [MessagesController::class, 'check']);
Route::get('allusers', [MessagesController::class, 'sentMessages']);
    //DELETE
Route::delete('deletemessage', [MessagesController::class, 'delete']);


// UPLOADS
Route::post('/profileImage', [FileController::class, 'saveProfileImage']);

// PASSWORD RESET
Route::group([
    'prefix' => 'forgot-password',
    'excluded_middleware' => ['auth:api'],
], function () {
    Route::post('/forgot', [ForgotController::class, 'forgot']);
    Route::post('/reset', [ForgotController::class, 'reset']);
});

//EXCLUDED FROM AUTH MIDDLEWARE

Route::group([
    'excluded_middleware' => ['auth:api'],
], function () {
    //POSTS
    Route::get('posts', [PostsController::class, 'index']);
    Route::get('postbycat', [PostsController::class, 'postsByCategory']);
    Route::get('pending', [PostsController::class, 'pendingPosts']);
    Route::get('latestapprovedposts', [PostsController::class, 'latestApprovedPosts']);
    Route::get('featuredposts', [PostsController::class, 'featuredPosts']);
    Route::get('/postbyid', [PostsController::class, 'postById']);
    Route::get('/getpostcomments', [CommentsController::class, 'getPostComments']);
    //REGISTER & CONTACT
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/contact', [MailController::class, 'contact']);
    //CATEGORIES
    Route::get('category', [CategoriesController::class, 'index']);
    //ACCOLADES
    Route::get('/accolades', [AccoladeController::class, 'Accolades']);
});





