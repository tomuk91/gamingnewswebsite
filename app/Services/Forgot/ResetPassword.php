<?php

namespace App\Services\Forgot;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;


class ResetPassword {

    public function reset($request) {

        $token = $request->input('token');

        if (!$passwordResets = DB::table('password_resets')->where('token', $token)->first()) {
            return;
        }

        /** @var User $user */
        if (!$user = User::where('email', $passwordResets->email)->first()) {
            return;
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        return DB::table('password_resets')->where('token', $token)->delete();

    }
}
