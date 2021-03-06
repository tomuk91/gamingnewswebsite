<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber($min = 1, $high = 21),
            'parent_id' => $this->faker->randomNumber($min = 1, $max = 10),
            'post_id' => $this->faker->randomNumber($min = 1, $max = 10),
            'comment' => $this->faker->text(30),
        ];
    }
}
