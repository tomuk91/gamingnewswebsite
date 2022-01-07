<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'subject', 'parent_id', 'sender_id', 'recipient_id', 'conversation_id'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id')->select('id', 'username');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function conversations() {
        return $this->hasMany(Messages::class, 'conversation_id');
    }
}
