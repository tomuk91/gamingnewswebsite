<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUpdateUser {

    public function create($request) {

        $user = User::create([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('retromize')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($response, 201);

    }

    public function update($request) {

        if (!Auth::user()) {
            return;
        }

        $user = User::findOrFail(Auth::user()->id);

        $newPassword = $request->get('password');

        if (empty($newPassword)) {
            $user->update($request->except('password'));
            $user->username = $request->input('username');
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->email = $request->input('email');
            return $user->save();
        } else {
            $user->username = $request->input('username');
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->password);
            return $user->save();
        }
    }
}
