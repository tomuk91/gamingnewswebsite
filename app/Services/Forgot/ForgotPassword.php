<?php

namespace App\Services\Forgot;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Str;

class ForgotPassword {

    public function forgot($request) {

        $email = $request->input('email');

        if (User::where('email', $email)->doesntExist()) {
            return;
        }

        $token = Str::random(10);

         try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            Mail::send('Mail.forgot', ['token' => $token], function ($message) use ($email) {
                $message->to($email);
                $message->subject('Reset your password');

            });
        } catch (\Exception $exception) {
            return $exception;
        } finally {
            return('Message Sent!');
        }
    }
}
