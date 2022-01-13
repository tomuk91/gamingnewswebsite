<?php

namespace App\Http\Controllers;

use App\Models\Conversations;
use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\Messages\ConversationMessages;
use App\Services\Messages\UserConversations;
use App\Services\Messages\ReplyToConversation;
use App\Services\Messages\DeleteConversation;
use App\Services\Messages\CreateConversation;

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


    public function messagesByConversation(Request $request, ConversationMessages $messages)
     {
        $action = $messages->getMessages($request);

        if($action->isNotEmpty()) {
            return $action->collect();
        } else {
            return response('unauthorized', 404 );
        }
    }

    public function conversation(UserConversations $conversations)
    {
        $action = $conversations->getConversations();

        if($action->isNotEmpty()){
            return $action;
        } else {
            return response()->json(['message'=> 'user has no conversations'], 204);
        }
    }

    public function reply(Request $request, ReplyToConversation $reply)
    {
        $action = $reply->createReply($request);

        if($action->id) {
            return response()->json(['message'=> 'reply sent!'], 200);
        } else {
            return response()->json(['error'=> 'unable to send message'], 400);
        }
    }

    public function delete(Request $request, DeleteConversation $delete )
    {
        $action = $delete->deleteConversation($request);

        if($action === 'true') {
            return response()->json('Successfully deleted!', 200);
        } else {
            return response()->json(['message' => 'There was a problem, please try again', 'error' => $action], 400);
        }
    }

    public function sentMessages() {

        $user_id = Auth::user()->id;

        return Messages::where('sender_id', $user_id)->get();
    }

    public function createConversation(Request $request, CreateConversation $conversation )
    {
        $action = $conversation->create($request);

        if($action) {
            return response()->json(['message' => 'conversation created!'], 200);
        } else {
            return response()->json(['error' => 'unable to create conversation'], 400);
        }
    }
}
