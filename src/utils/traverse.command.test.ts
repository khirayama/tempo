// tslint:disable:no-any
import { IBulletedItem, IDividerItem, IHeaderItem, IItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { copyItems, sampleItems } from 'utils/traverse.samples';

/*
  addBefore
  addAfter
  indent
  unindent
  destroy
  merge
  turnInto
*/

describe('traverse', () => {
  describe('addBefore', () => {
    it('add an item before id: 1', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '1');
      expect(items[0].id).toEqual(newItem.id);
      expect(items[1].id).toEqual('1');
      expect(items[2].id).toEqual('2');
      expect(items[3].id).toEqual('3');
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 2', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual(newItem.id);
      expect(items[2].id).toEqual('2');
      expect(items[3].id).toEqual('3');
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 3', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual(newItem.id);
      expect(items[3].id).toEqual('3');
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 4', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual(newItem.id);
      expect(items[4].id).toEqual('4');
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 5', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual(newItem.id);
      expect(items[5].id).toEqual('5');
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 6', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual(newItem.id);
      expect(items[6].id).toEqual('6');
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 7', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual(newItem.id);
      expect(items[7].id).toEqual('7');
      expect(items[8].id).toEqual('8');
    });

    it('add an item before id: 8', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addBefore(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('3');
      expect(items[3].id).toEqual('4');
      expect(items[4].id).toEqual('5');
      expect(items[5].id).toEqual('6');
      expect(items[6].id).toEqual('7');
      expect(items[7].id).toEqual(newItem.id);
      expect(items[8].id).toEqual('8');
    });
  });

  describe('addAfter', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      const newItem: IItem = <IItem>traverse.addAfter(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual(newItem.id);
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
    });
  });
});
