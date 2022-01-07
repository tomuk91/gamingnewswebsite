<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function inbox() {

        $user_id = Auth::user()->id;

        return Messages::where('recipient_id', $user_id)->get();
    }

    public function conversation(Request $request) {

        $id = $request->id;

        return Messages::where('id', $id)->with('conversations.sender')->get();
    }

    public function sentMessages() {

        $user_id = Auth::user()->id;

        return Messages::where('sender_id', $user_id)->get();
    }

    public function sendMessage(Request $request) {

        $user_id = Auth::user()->id ?? null;

        Messages::create([
            'message' => $request->message,
            'subject' => $request->subject,
            'recipient_id' => $request->send_to,
            'sender_id' =>  $request->sender_id ?? $user_id,
            'conversation_id' => $request->conversation_id,
        ]);

    }
}
