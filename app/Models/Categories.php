<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'parent_id'];

    protected $hidden = [

    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }

    public function subCategories()
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }
}
