<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Services\Mail\Contact;
use Error;


class MailController extends Controller
{

    public function contact(Request $request, Contact $contact)
    {
        $action = $contact->contact($request);

        if($action) {
            return response()->json('There was an error sending your message', 400);
        } else {
            return response()->json('Message Sent!', 200);
        }
    }
}
