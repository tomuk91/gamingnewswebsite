<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\JsonResponse as HttpFoundationJsonResponse;
use Illuminate\Support\Facades\Response;

class ProfileData {

    public function userData($request) {


        $user_id = auth('api')->user()->id;

        if($user_id == null) {
            $user = User::where('id', $user_id)->with('userProfilePicture')->get();
        }


        if($request->id != $user_id) {
            $user = User::with('userProfilePicture')->where('id', $request->id)->select('id', 'username', 'created_at')->get();
            $public = true;
        } else {
            $public = false;
            $user = User::where('id', $user_id)->with('userProfilePicture')->get();
        };

       $user->put('public', $public);

       return $user;
  }
}

?>
