/* eslint-disable camelcase */
export interface UserLogin{
    token: string;
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      refresh_token?: string | null;
      access_token?: string | null;
      image: string;
      updated_at: string;
      created_at: string;
      user_profile_picture: {
        created_at: string;
        id: number;
        image: string;
        updated_at: string;
        user_id: string;
      };
    }
}
