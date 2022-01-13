<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversations extends Model
{

    protected $fillable = ['user_one', 'user_two', 'subject', 'created_by'];

    use HasFactory;

    public function messages() {
        return $this->hasMany(Messages::class, 'conversation_id', 'id');
    }

    public function creator() {
        return $this->hasMany(User::class, 'id', 'created_by')->select('id', 'username');
    }

    public function userTwo() {
        return $this->hasMany(User::class, 'id', 'user_two')->select('id', 'username');
    }

}
