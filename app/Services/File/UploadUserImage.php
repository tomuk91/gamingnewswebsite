<?php

namespace App\Services\File;


use Illuminate\Support\Facades\Auth;
use App\Models\userProfilePicture;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;





class UploadUserImage {

    public function SaveProfileImage($request) {

        $user_id = Auth::user()->id;

        $profileImage = new userProfilePicture();
        $userImage = userProfilePicture::where('user_id', $user_id)->first();

        if ($request->hasFile('image')) {
            if ($userImage) {
                Storage::delete('public/profile_images/' . $userImage->image);
                DB::table('user_profile_pictures')->where('user_id', $user_id)->delete();
            }
            $completeFileName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($completeFileName, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $saveableProfilePicName = str_replace(' ', '_', $fileName) . '-' . rand() . '_' . time() . '.' . $extension;
            $path = $request->file('image')->storeAs('public/profile_images', $saveableProfilePicName);
            $profileImage->user_id = +$user_id;
            $profileImage->image = $saveableProfilePicName;
            $saved = $profileImage->save();
            return $saved;
         }
    }
}
