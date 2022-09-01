import { Buffer } from 'buffer';

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function bufferToBase64(buf) {
  return Buffer.from(buf.buffer).toString('base64');
}

export function base64ToBuffer(base64) {
  return Buffer.from(base64, 'base64');
}

export function uniqueConcat(a, b) {
  return [...new Set([...a, ...b])];
}
