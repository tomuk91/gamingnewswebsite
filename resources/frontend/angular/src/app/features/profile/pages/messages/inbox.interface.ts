export interface Inbox {
  conversations: conversations[];
  conversation_id: number;
  created_at: Date;
  id: number;
  message: string;
  recipient_id: number;
  sender: {
    id: number;
    username: string;
  };
  sender_id: number;
  subject: string;
  updated_at: Date;
}

interface conversations {
  conversation_id: number;
  created_at: Date;
  id: number;
  message: string;
  recipient_id: number;
  sender: {
    id: number;
    username: string;
  };
  sender_id: number;
  subject: string;
  updated_at: Date;
}
