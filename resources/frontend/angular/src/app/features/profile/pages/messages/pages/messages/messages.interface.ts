export interface messages {
  conversation: [{}];
  conversation_id: number;
  created_at: Date;
  deleted_from_receiver: boolean;
  deleted_from_sender: boolean;
  id: number;
  is_seen: boolean;
  message: string;
  sender: {
    [index: number]: {
      id: number;
      username: string;
    };
  };
  updated_at: Date;
  user_id: number;
}
