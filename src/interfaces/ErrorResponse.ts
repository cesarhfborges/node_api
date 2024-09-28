import MessageResponse from './MessageResponse';

export default interface ErrorResponse extends MessageResponse {
  status: number;
  message: string;
  stack?: string;
}