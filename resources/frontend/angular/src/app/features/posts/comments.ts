import { positionService } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { CommentsUser } from '../profile/pages/user-posts/commentsUser';

export interface comments {
  id: number;
  post_id: number;
  user_id: number;
  parent_id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    user_profile_picture: string;
    username: string;
  };
  replies: [
    {
      id: number;
      post_id: number;
      user_id: number;
      parent_id: number;
      comment: string;
      replies: [];
      created_at: Date;
      updated_at: Date;
      user: {
        id: number;
        user_profile_picture: {
          image: string;
        }
        username: string;
      };
    }
  ];
}
