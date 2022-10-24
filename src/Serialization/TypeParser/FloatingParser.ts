/* eslint @typescript-eslint/no-var-requires: "off" */
import SerializationState from '../State';
import FixedParser from './FixedParser';

const fp: any = require('../../../lib/float');

export default class FloatingParser extends FixedParser {
  constructor(private readonly isDouble: boolean) {
    super(isDouble ? 8 : 4);
  }

  deserialize(state: SerializationState): number {
    if (this.isDouble) {
      return fp.readDoubleLE(super.deserialize(state));
    }

    return fp.readFloatLE(super.deserialize(state));
  }

  serialize(data: number): Uint8Array {
    // tslint:disable-next-line:prefer-const
    const bytes: number[] = [];

    if (this.isDouble) {
      fp.writeDoubleLE(bytes, data);

      return super.serialize(new Uint8Array(bytes));
    }

    fp.writeFloatLE(bytes, data);

    return super.serialize(new Uint8Array(bytes));
  }
}
