<?php

namespace App;
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;


use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'summary', 'image_url', 'url', 'website', 'tags', 'upvotes', 'pending', 'is_featured'];

    protected $hidden = [
        'pending'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'parent_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Categories::class)->select('name');
    }

    public function tags()
    {
        return $this->belongsToMany(Tags::class);
    }

}
