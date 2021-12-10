import { comments } from './comments';
export interface PostDetails {
    id: number;
    title: string;
    summary: string;
    category: string;
    image_url: string;
    comments: comments[];
    url: string;
    website: string;
    tags: string;
    upvotes: number;
    is_featured: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}
