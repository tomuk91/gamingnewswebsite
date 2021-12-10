<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;
use App\Services\Forgot\ForgotPassword;
use App\Services\Forgot\ResetPassword;

class ForgotController extends Controller
{
    public function forgot(ForgotRequest $request, ForgotPassword $user) {

        $action = $user->forgot($request);

        if($action) {
            return response([
                'message' => 'Check your email!',
                'code' =>  200
            ]);
        } else {
            return response()->json($action, 403);
        }
    }

    public function reset(ResetRequest $request, ResetPassword $user) {

        $action = $user->reset($request);

        if($action) {
           return response()->json('Success', 200);
        } else {
            return response()->json('Unable to process your request', 403);
        }
    }
}
