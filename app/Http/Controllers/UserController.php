<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use App\Services\User\CreateUpdateUser;
use App\Services\User\DeleteUser;
use App\Services\User\LoginUser;
use App\Services\User\LogoutUser;
use App\Services\User\UserService;
use App\Services\User\ProfileData;
use App\Services\User\UserStats;
use Illuminate\Http\Request;



class UserController extends Controller
{

    public function index()
    {
        return User::all();

    }

    public function stats(Request $request, UserStats $stats) {

        $action = $stats->getStats($request);

        return $action;
    }


    public function getLoggedInuser(userService $user)
    {
        $action = $user->currentUser();

        return $action;
    }

    public function getProfileData(Request $request, ProfileData $profile) {


        $action = $profile->userData($request);

        return response()->json($action, 200);

    }

    public function delete(DeleteUser $user)
    {
       $action = $user->delete();

       return response()->json($action, 200);
    }

    public function register(UserRegisterRequest $request, CreateUpdateUser $user)
    {
       $action = $user->create($request);

       return response()->json($action, 200);
    }

    public function login(Request $request, LoginUser $user )
    {
        $action = $user->login($request);

        return $action;

    }

    public function logout(LogoutUser $user)
    {
       $action = $user->logout();

       return response()->json($action, 200);

    }

    public function update(UpdateUserRequest $request, CreateUpdateUser $user)

    {
        $action = $user->update($request);

        return response()->json($action, 200);

    }
}
