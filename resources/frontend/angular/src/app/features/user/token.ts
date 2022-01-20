/* eslint-disable camelcase */
export interface Token {
    refresh_token?: string | null;
    access_token?: string | null;
    expires_in: string;
    token_type: string;
}
