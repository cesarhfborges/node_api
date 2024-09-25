import crypto from "crypto";
import {addHours} from "date-fns";

export default function confirmationHash(): { hash: string; validade: Date } {
  const uint8Array = new Uint8Array(32);
  const rng = crypto.getRandomValues(uint8Array);
  const hash = Array.from(rng).map(b => b.toString(16).padStart(2, '0')).join('');
  const validade = addHours(new Date(), 4);
  return {
    validade,
    hash
  }
}