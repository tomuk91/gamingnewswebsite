import { categories } from './../../../posts/pages/create-post/categories';
import { comments } from './../../../posts/comments';
export interface Posts {
    id: number;
    title: string;
    summary: string;
    categories: categories[];
    image_url: string;
    comments: comments[],
    url: string;
    website: string;
    upvotes: number;
    is_featured: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}
