<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function findForPassport($username){
    return $user = (new User)->where('email', $username)->orWhere('username', $username)->first();
    }

    public function AauthAcessToken(){
    return $this->hasMany('\App\OauthAccessToken');

}

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'email',
        'password',
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function post()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function userProfilePicture()
    {
        return $this->hasOne(userProfilePicture::class);
    }

    public function votes()
    {
        return $this->hasMany(Votes::class);
    }

    public function conversations() {
        return $this->hasMany(Conversations::class);
    }

    public function messages() {
        return $this->hasMany(Message::class, 'user_id');
    }

    public function accolades()
    {
        return $this->belongsToMany(Accolades::class);
    }



}
