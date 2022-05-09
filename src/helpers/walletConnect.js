import { Buffer } from 'buffer';
import { blobFromUint8Array, blobToUint8Array } from '@dfinity/candid';

import { getAssets, sign } from '../redux/slices/user';
import { addAbortSignal } from 'stream';

const SIGNING_METHODS = ['sign', 'transfer'];

function bufferToBase64(buf) {
  return Buffer.from(buf.buffer).toString('base64');
}

function base64ToBuffer(base64) {
  return Buffer.from(base64, 'base64');
}

const WALLETCONNECT_HANDLERS = {
  sign: async (args, dispatch) => {
    //if (!(args && args.lenght > 0)) throw 'NOT MSG ON SIGN ARGS';

    const argsDecoded = base64ToBuffer(args[0]);

    const result = await dispatch(
      sign({ msg: blobFromUint8Array(new Uint8Array(argsDecoded)) }),
    ).unwrap();

    return { result: result.response.toString('base64') };
  },
  sign_read_state: async (args, dispatch) => {
    //if (!(args && args.lenght > 0)) throw 'NOT MSG ON SIGN ARGS';
    console.log('SIGN_READ_STATE', args);

    const argsDecoded = base64ToBuffer(args[0]);

    const result = await dispatch(
      sign({ msg: blobFromUint8Array(new Uint8Array(argsDecoded)) }),
    ).unwrap();
    console.log('SIGN_READ_STATE RESULT', result.response.toString('base64'));

    return { result: result.response.toString('base64') };
  },
  getAssets: async (args, dispatch) => {
    const result = await dispatch(getAssets(args));
    return result;
  },
};

export const notSigningMethod = method => !SIGNING_METHODS.includes(method);

export const walletConnectHandleMethod = (method, args, dispatch) => {
  return WALLETCONNECT_HANDLERS[method](args, dispatch);
};
