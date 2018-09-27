// tslint:disable:no-any
import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { copyItems, sampleItems, sampleItems2 } from 'utils/traverse.samples';

// TODO: sampleItems3に対して様々操作(特にstyleが関係する以下)
// - cancel
// - findUpper
// - findUpperSkipNoText
// - findDowner
// - findDownerSkipNoText
// - addBefore
// - addAfter

describe('traverse', () => {
  it('tmp', () => {
    expect(1).toEqual(1);
  });
});
