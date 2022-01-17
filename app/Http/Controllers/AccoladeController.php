<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accolades;
use Illuminate\Support\Facades\DB;

class AccoladeController extends Controller
{
    public function Accolades() {

        $id = auth('api')->user()->id;

        return  Accolades::whereDoesntHave('users', function($q) use ($id){
            $q->where('user_id', $id);
            })->get();
    }
}
