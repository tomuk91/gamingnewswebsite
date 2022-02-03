import { messages } from './messages.interface'
/* eslint-disable camelcase */
export interface Inbox {
// eslint-disable-next-line no-use-before-define
conversations: conversations[];
conversation_id: number;
created_at: Date;
id: number;
message: string;
recipient_id: number;
creator: {
  [index: number]: {
    id: number;
    username: string;
  };
};
user_two: {
  [index: number]: {
    id: number;
    username: string;
  };
};
messages: messages[];
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
