type ExchangeResponse = {
  message: string;
  success: boolean;
  payload: {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
  }
  timestamp: string;
}