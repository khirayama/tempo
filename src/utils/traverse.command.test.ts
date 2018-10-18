// tslint:disable:no-any
import { IBulletedItem, IDividerItem, IHeaderItem, IItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { copyItems, sampleItems } from 'utils/traverse.samples';

/*
  addAfter
  indent
  unindent
  remove
  merge
  turnInto
*/

describe('traverse', () => {
  describe('addAfter', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual(newItem.id);
      expect(items[1].indent).toEqual(0);
      expect(items[2].id).toEqual('2');
      expect(items[3].id).toEqual('3');
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 2', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual(newItem.id);
      expect(items[2].indent).toEqual(1);
      expect(items[3].id).toEqual('3');
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 3', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual(newItem.id);
      expect(items[3].indent).toEqual(1);
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 4', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual(newItem.id);
      expect(items[4].indent).toEqual(2);
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 5', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual(newItem.id);
      expect(items[5].indent).toEqual(2);
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 6', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual(newItem.id);
      expect(items[6].indent).toEqual(1);
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 7', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual('7');
      expect(items[7].id).toEqual(newItem.id);
      expect(items[7].indent).toEqual(1);
      expect(items[8].id).toEqual('8');
    });

    it('add an item after id: 8', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual('7');
      expect(items[7].id).toEqual('8');
      expect(items[8].id).toEqual(newItem.id);
      expect(items[8].indent).toEqual(0);
    });
  });

  describe('remove', () => {
    it('remove id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '1');
      expect(items[0].id).toEqual('2');
      expect(items[1].id).toEqual('3');
      expect(items[2].id).toEqual('4');
      expect(items[3].id).toEqual('5');
      expect(items[4].id).toEqual('6');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('3');
      expect(items[2].id).toEqual('4');
      expect(items[3].id).toEqual('5');
      expect(items[4].id).toEqual('6');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('4');
      expect(items[3].id).toEqual('5');
      expect(items[4].id).toEqual('6');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('5');
      expect(items[4].id).toEqual('6');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('6');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('7');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual('8');
    });

    it('remove id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.remove(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual('7');
    });
  });
});
