<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Token;
use App\Models\User;

class DeleteUser {

    public function delete()
    {
        $user_id = Auth::user()->id;
        $user = User::findOrFail($user_id);


        if (!$user) {
            throw new \Exception('No user logged in!');
        }

        if ($user) {
            Token::where('user_id', $user->id)->update(['revoked' => true]);
            return $user->delete();
        } else {
            return throw new \Exception('User not found!');
        }
    }

}
