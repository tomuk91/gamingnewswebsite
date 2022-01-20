/* eslint-disable camelcase */
import { categories } from './categories'
import { comments } from './comments'
export interface PostDetails {
    id: number;
    title: string;
    summary: string;
    categories: categories[];
    image_url: string;
    comments: comments[];
    url: string;
    website: string;
    upvotes: number;
    is_featured: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    // eslint-disable-next-line no-use-before-define
    votes: votes[];
}

export interface votes {
  [index: number]: {
    status: number;
  }
}
