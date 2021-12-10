<?php

namespace App\Services\Mail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Contact {

    public function contact($request) {
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
            return 'Unable to send message';
        }
    }
}
?>
