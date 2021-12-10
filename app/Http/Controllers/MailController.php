<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Error;


class MailController extends Controller
{

    public function contact(Request $request)
    {
        $input = $request->all();

        $supportType = $input['optionName'];
        $contactEmail = $input['email'];
        $contactUrl = $input['url'];
        $contactMessage = $input['message'];

        $data = array('supportType' => $supportType, 'url' => $contactUrl, 'email' => $contactEmail, 'body' => $contactMessage);
         Mail::send('Mail.contact', $data, function ($message) {
            $message->from('info@retromize.com');
            $message->to('tom.thornton@hotmail.co.uk', 'myName');
            $message->subject('New Request From Retomize Contact Page');
        });

        if(Mail::failures()) {
            return response()->json('There was an error sending your message', 400);
        } else {
            return response()->json('Message Sent!', 200);
        }
    }
}
