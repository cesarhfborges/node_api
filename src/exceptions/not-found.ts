import Exception from "./exception";

export default class NotFound extends Exception {
  constructor(message: string) {
    super(404, message);
  }
}