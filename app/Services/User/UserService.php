<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\JsonResponse as HttpFoundationJsonResponse;
use Illuminate\Support\Facades\Response;

class UserService {

    public function currentUser() {

        $user_id = Auth::user()->id;


        if(!$user_id) {
            return response()->json('No user logged in', 404);
        }

       $user = User::where('id', $user_id)->with('userProfilePicture')->get();

       return $user;

    }
}

?>
