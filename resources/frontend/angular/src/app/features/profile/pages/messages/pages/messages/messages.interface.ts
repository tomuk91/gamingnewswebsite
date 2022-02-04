/* eslint-disable camelcase */
export interface messages {
  conversation: [{}];
  conversation_id: number;
  created_at: Date;
  deleted_from_receiver: boolean;
  deleted_from_sender: boolean;
  id: number;
  message: string;
  sender: {
    [index: number]: {
      id: number;
      username: string;
    };
  };
  is_seen: boolean;
  updated_at: Date;
  user_id: number;
}
