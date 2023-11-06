export interface JwtToken {
    sid: string; 
    iss: string; 
    aud: string; 
    exp: number; 
    iat: 1;
    nbf: 1;
    sub: string;
    client_id: string; 
    auth_time: number; 
    state: string;
    nonce: string; 
    at_hash: string; 
    preferred_username: string; 
    groups: string[];
  }