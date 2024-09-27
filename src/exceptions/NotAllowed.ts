export default class NotAllowed extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    super.name = "NotAllowed";
    this.statusCode = statusCode;
    this.message = message;
  }
}