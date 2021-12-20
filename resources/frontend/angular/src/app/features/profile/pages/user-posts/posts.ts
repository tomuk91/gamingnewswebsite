import { categories } from './../../../posts/pages/create-post/categories';
import { comments } from './../../../posts/comments';
export interface Posts {
    data: PostDetails[];
    links: any[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
 export interface PostDetails {
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


