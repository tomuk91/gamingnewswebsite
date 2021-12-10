<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->title(),
            'summary' => $this->faker->text(100),
            'image_url' => $this->faker->image(),
            'url' => $this->faker->text(10),
            'website' => $this->faker->unique()->word,
            'pending' => $this->faker->boolean(50),
            'upvotes' => $this->faker->numberBetween($min = 1, $max = 10),
            'is_featured' => $this->faker->numberBetween($min = 1, $max = 2),
            'user_id' => $this->faker->numberBetween($min = 1, $max = 21)
        ];
    }
}
