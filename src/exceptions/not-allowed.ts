import Exception from "./exception";

export default class NotAllowed extends Exception {
  constructor(message: string) {
    super(406, message);
  }
}