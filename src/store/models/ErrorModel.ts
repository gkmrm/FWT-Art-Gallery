export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface INotificationSliceState {
  message: string | null;
}
