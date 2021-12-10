<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\File\UploadUserImage;

class FileController extends Controller
{

    protected function saveProfileImage(Request $request, UploadUserImage $user)
    {
        $saved = $user->SaveProfileImage($request);

        if ($saved) {
            return response([
                'message' => 'Profile image saved!'
            ], 200);
        } else {
            return response([
                'message' => 'There was a problem uploading your profile picture'
            ], 400);
        }
    }
}
