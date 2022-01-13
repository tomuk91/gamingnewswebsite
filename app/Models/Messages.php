<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id', 'is_seen', 'deleted_from_sender', 'deleted_from_receiver', 'message', 'user_id'];

    public function getMessageAttribute($value) {
        return decrypt($value);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function conversation() {
        return $this->hasMany(Conversations::class, 'id', 'conversation_id')->select('id', 'user_one', 'user_two');
    }

    public function sender() {
        return $this->hasMany(User::class, 'id', 'user_id')->select('id', 'username');
    }

}
