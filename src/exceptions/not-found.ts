export default class NotFound extends Error {
  statusCode: number = 403;
  message: string;

  constructor(message: string) {
    super(message);
    super.name = this.name;
    this.message = message;
  }
}