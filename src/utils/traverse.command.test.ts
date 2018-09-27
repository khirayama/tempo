// tslint:disable:no-any
import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { copyItems, sampleItems, sampleItems2 } from 'utils/traverse.samples';

// TODO: turnIntoのテスト追加

/*
  addAfter
  indent
  unindent
  destroy
  cancel
  moveBefore
  moveAfter
  turnInto
*/

describe('traverse', () => {
  describe('addAfter', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '1', '9');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('9');
      expect(items[1].children[0].id).toEqual('2');
      expect(items[1].children[1].id).toEqual('3');
      expect(items[1].children[1].children[0].id).toEqual('4');
      expect(items[1].children[1].children[1].id).toEqual('5');
      expect(items[1].children[2].id).toEqual('6');
      expect(items[1].children[3].id).toEqual('7');
      expect(items[2].id).toEqual('8');
    });

    it('add an item after id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '2', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('9');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '3', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[2].id).toEqual('9');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '4', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('9');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '5', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('9');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '6', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('9');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '7', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[0].children[4].id).toEqual('9');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '8', '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
      expect(items[2].id).toEqual('9');
    });
  });

  describe('indent', () => {
    it('indent id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[0].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[2].children[0].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('indent id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.indent(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[0].children[4].id).toEqual('8');
    });
  });

  describe('unindent', () => {
    it('unindent id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unindent id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('8');
    });

    it('unindent id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('3');
      expect(items[1].children[0].id).toEqual('4');
      expect(items[1].children[1].id).toEqual('5');
      expect(items[2].id).toEqual('8');
    });

    it('unindent id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('4');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unindent id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[2].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unindent id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('6');
      expect(items[2].id).toEqual('8');
    });

    it('unindent id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[1].id).toEqual('7');
      expect(items[2].id).toEqual('8');
    });

    it('unindent id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.unindent(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });
  });

  describe('destroy', () => {
    it('destroy id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '1');
      expect(items[0].id).toEqual('8');
    });

    it('destroy id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[1].id).toEqual('8');
    });

    it('destroy id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.destroy(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });
  });

  describe('cancel', () => {
    it('add id: 9 after id: 1 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '1', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[2].children[0].id).toEqual('4');
      expect(items[2].children[1].id).toEqual('5');
      expect(items[3].id).toEqual('6');
      expect(items[4].id).toEqual('7');
      expect(items[5].id).toEqual('8');
    });

    it('add id: 9 after id: 2 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '2', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 3 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '3', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[2].id).toEqual('4');
      expect(items[0].children[3].id).toEqual('5');
      expect(items[0].children[4].id).toEqual('6');
      expect(items[0].children[5].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 4 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '4', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 5 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '5', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('9');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');

      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 6 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '6', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 7 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '7', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('9');
      expect(items[2].id).toEqual('8');

      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add id: 9 after id: 8 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addAfter(items, '8', '9');
      traverse.cancel(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('sample2: cancel id: 3', () => {
      const items: any = copyItems(sampleItems2);
      traverse.cancel(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[1].id).toEqual('4');
    });
  });

  describe('moveBefore', () => {
    it('move id: 8 before id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '1');

      expect(items[0].id).toEqual('8');
      expect(items[1].id).toEqual('1');
      expect(items[1].children[0].id).toEqual('2');
      expect(items[1].children[1].id).toEqual('3');
      expect(items[1].children[1].children[0].id).toEqual('4');
      expect(items[1].children[1].children[1].id).toEqual('5');
      expect(items[1].children[2].id).toEqual('6');
      expect(items[1].children[3].id).toEqual('7');
    });

    it('move id: 8 before id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '2');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('8');
      expect(items[0].children[1].id).toEqual('2');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 8 before id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '3');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('8');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 8 before id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '4');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('8');
      expect(items[0].children[1].children[1].id).toEqual('4');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 before id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '5');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('8');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 before id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '6');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('8');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 before id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '8', '7');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('8');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 1 before id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveBefore(items, '1', '8');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });
  });

  describe('moveAfter', () => {
    it('move id: 8 after id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('8');
      expect(items[0].children[1].id).toEqual('2');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 8 after id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('8');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 8 after id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('8');
      expect(items[0].children[1].children[1].id).toEqual('4');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 after id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('8');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 after id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '5');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('8');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });

    it('move id: 8 after id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '6');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('8');
      expect(items[0].children[4].id).toEqual('7');
    });

    it('move id: 8 after id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '8', '7');

      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[0].children[4].id).toEqual('8');
    });

    it('move id: 1 after id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.moveAfter(items, '1', '8');

      expect(items[0].id).toEqual('8');
      expect(items[1].id).toEqual('1');
      expect(items[1].children[0].id).toEqual('2');
      expect(items[1].children[1].id).toEqual('3');
      expect(items[1].children[1].children[0].id).toEqual('4');
      expect(items[1].children[1].children[1].id).toEqual('5');
      expect(items[1].children[2].id).toEqual('6');
      expect(items[1].children[3].id).toEqual('7');
    });
  });
});
