// tslint:disable:no-any
import { IBulletedItem, IDividerItem, IHeaderItem, IItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { copyItems, sampleItems, sampleItems2 } from 'utils/traverse.samples';

/*
  addAfter
  indent
  unindent
  destroy
  cancel
  moveBefore
  moveAfter
  merge
  turnInto
*/

describe('traverse', () => {
  describe('addAfter', () => {
    it('add an item before id: 1', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '1');
      expect(items[0].id).toEqual(newItem.id);
      expect(items[1].id).toEqual('1');
      expect(items[1].children[0].id).toEqual('2');
      expect(items[1].children[1].id).toEqual('3');
      expect(items[1].children[1].children[0].id).toEqual('4');
      expect(items[1].children[1].children[1].id).toEqual('5');
      expect(items[1].children[2].id).toEqual('6');
      expect(items[1].children[3].id).toEqual('7');
      expect(items[2].id).toEqual('8');
    });

    it('add an item before id: 2', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual(newItem.id);
      expect(items[0].children[1].id).toEqual('2');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 3', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual(newItem.id);
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 4', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual(newItem.id);
      expect(items[0].children[1].children[1].id).toEqual('4');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 5', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual(newItem.id);
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 6', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual(newItem.id);
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 7', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual(newItem.id);
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item before id: 8', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual(newItem.id);
      expect(items[2].id).toEqual('8');
    });
  });

  describe('addAfter', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual(newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual(newItem.id);
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 3', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[2].id).toEqual(newItem.id);
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 4', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual(newItem.id);
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 5', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual(newItem.id);
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 6', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual(newItem.id);
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 7', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[0].children[4].id).toEqual(newItem.id);
      expect(items[1].id).toEqual('8');
    });

    it('add an item after id: 8', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
      expect(items[2].id).toEqual(newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '1');
      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '2');
      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '3');
      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '4');
      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '5');
      traverse.cancel(items, newItem.id);
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual(newItem.id);
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');

      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '6');
      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '7');
      traverse.cancel(items, newItem.id);
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual(newItem.id);
      expect(items[2].id).toEqual('8');

      traverse.cancel(items, newItem.id);
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
      const newItem: IItem = <IItem>traverse.addAfter(items, '8');
      traverse.cancel(items, newItem.id);
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

  describe('turnInto', () => {
    it('TEXT to BULLETED', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'BULLETED');

      expect(item.id).toEqual('1');
      expect(item.style).toEqual('BULLETED');
      expect(item.text).toEqual('text 1');
      expect(item.children.length).toEqual(4);
    });

    it('TEXT to NUMBERED', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'NUMBERED');

      expect(item.id).toEqual('1');
      expect(item.style).toEqual('NUMBERED');
      expect(item.text).toEqual('text 1');
      expect(item.children.length).toEqual(4);
    });

    it('TEXT to TASK', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'TASK');
      const turnedIntoItem: ITaskItem = <ITaskItem>traverse.find(items, '1');

      expect(turnedIntoItem.id).toEqual('1');
      expect(turnedIntoItem.style).toEqual('TASK');
      expect(turnedIntoItem.text).toEqual('text 1');
      expect(turnedIntoItem.completed).toEqual(false);
      expect(turnedIntoItem.children.length).toEqual(4);
    });

    it('TEXT to TOGGLE', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'TOGGLE');
      const turnedIntoItem: IToggleItem = <IToggleItem>traverse.find(items, '1');

      expect(turnedIntoItem.id).toEqual('1');
      expect(turnedIntoItem.style).toEqual('TOGGLE');
      expect(turnedIntoItem.text).toEqual('text 1');
      expect(turnedIntoItem.opened).toEqual(false);
      expect(turnedIntoItem.children.length).toEqual(4);
    });

    it('TEXT to HEADER', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'HEADER');
      const turnedIntoItem: IHeaderItem = <IHeaderItem>traverse.find(items, '1');

      expect(turnedIntoItem.id).toEqual('1');
      expect(turnedIntoItem.style).toEqual('HEADER');
      expect(turnedIntoItem.text).toEqual('text 1');
    });

    it('TEXT to DIVIDER', () => {
      const items: IItem[] = copyItems(sampleItems);
      const item: ITextItem = <ITextItem>traverse.find(items, '1');

      traverse.turnInto(item, 'DIVIDER');
      const turnedIntoItem: IDividerItem = <IDividerItem>traverse.find(items, '1');

      expect(turnedIntoItem.id).toEqual('1');
      expect(turnedIntoItem.style).toEqual('DIVIDER');
    });
  });
});
