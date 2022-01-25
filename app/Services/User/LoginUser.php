<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginUser {

    public function login($request) {

        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);



        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Bad Credentials'], 401);
        }

        if($user->tokens()) {
            $user->tokens()->delete();
        }

        $token = $user->createToken('retromize')->plainTextToken;
        
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($response, 201);

    }
}
