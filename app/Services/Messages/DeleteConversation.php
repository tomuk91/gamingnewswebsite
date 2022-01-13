<?php

namespace App\Services\Messages;
use App\Models\Conversations;
use Exception;


use Illuminate\Support\Facades\Auth;

class DeleteConversation {

    public function deleteConversation($request)
    {
        $id = $request->id;

        if($id == null) return;

        try {
            Conversations::where('id', $id )->delete();
            $status = 'true';
        } catch(Exception $e) {
            return $e;
            $status = 'false' + $e;
        }

        return $status;
    }
}
