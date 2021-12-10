<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Token;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LogoutUser {

    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            return throw new \Exception('No user logged in!');
        } else {
            Token::where('user_id', $user->id)->update(['revoked' => true]);
            return 'User successfully logged out';
        }
    }
}
