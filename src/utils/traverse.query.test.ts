import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { sampleItems } from 'utils/traverse.samples';

/*
  find
  findParent
  findParentBrother
  findLastChild
  findUpper
  findUpperSkipNoText
  findDowner
  findDownerSkipNoText
*/

describe('traverse', () => {
  describe('find', () => {
    it('id: 1 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '1');
      expect(actual.id).toEqual('1');
    });

    it('id: 2 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '2');
      expect(actual.id).toEqual('2');
    });

    it('id: 3 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '3');
      expect(actual.id).toEqual('3');
    });

    it('id: 4 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '4');
      expect(actual.id).toEqual('4');
    });

    it('id: 5 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '5');
      expect(actual.id).toEqual('5');
    });

    it('id: 6 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '6');
      expect(actual.id).toEqual('6');
    });

    it('id: 7 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '7');
      expect(actual.id).toEqual('7');
    });

    it('id: 8 is an item', () => {
      const actual: IItem = <IItem>traverse.find(sampleItems, '8');
      expect(actual.id).toEqual('8');
    });

    it('id: 9 is null', () => {
      const actual: IItem | null = traverse.find(sampleItems, '9');
      expect(actual).toEqual(null);
    });
  });

  describe('findPrev', () => {
    it('prev item of id: 1 is null', () => {
      const actual: IItem | null = traverse.findPrev(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('prev item of id: 2 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '2');
      expect(actual.id).toEqual('1');
    });

    it('prev item of id: 3 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '3');
      expect(actual.id).toEqual('2');
    });

    it('prev item of id: 4 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '4');
      expect(actual.id).toEqual('3');
    });

    it('prev item of id: 5 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '5');
      expect(actual.id).toEqual('4');
    });

    it('prev item of id: 6 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '6');
      expect(actual.id).toEqual('5');
    });

    it('prev item of id: 7 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '7');
      expect(actual.id).toEqual('6');
    });

    it('prev item of id: 8 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrev(sampleItems, '8');
      expect(actual.id).toEqual('7');
    });
  });

  describe('findPrevSkipNoText', () => {
    it('prev item of id: 1 is null', () => {
      const actual: IItem | null = traverse.findPrevSkipNoText(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('prev item of id: 2 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '2');
      expect(actual.id).toEqual('1');
    });

    it('prev item of id: 3 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '3');
      expect(actual.id).toEqual('2');
    });

    it('prev item of id: 4 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '4');
      expect(actual.id).toEqual('3');
    });

    it('prev item of id: 5 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '5');
      expect(actual.id).toEqual('4');
    });

    it('prev item of id: 6 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '6');
      expect(actual.id).toEqual('5');
    });

    it('prev item of id: 7 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '7');
      expect(actual.id).toEqual('6');
    });

    it('prev item of id: 8 is an item', () => {
      const actual: IItem = <IItem>traverse.findPrevSkipNoText(sampleItems, '8');
      expect(actual.id).toEqual('7');
    });
  });

  describe('findNext', () => {
    it('next item of id: 1 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '1');
      expect(actual.id).toEqual('2');
    });

    it('next item of id: 2 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '2');
      expect(actual.id).toEqual('3');
    });

    it('next item of id: 3 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '3');
      expect(actual.id).toEqual('4');
    });

    it('next item of id: 4 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '4');
      expect(actual.id).toEqual('5');
    });

    it('next item of id: 5 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '5');
      expect(actual.id).toEqual('6');
    });

    it('next item of id: 6 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '6');
      expect(actual.id).toEqual('7');
    });

    it('next item of id: 7 is an item', () => {
      const actual: IItem = <IItem>traverse.findNext(sampleItems, '7');
      expect(actual.id).toEqual('8');
    });

    it('next item of id: 8 is null', () => {
      const actual: IItem | null = traverse.findNext(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });

  describe('findNextSkipNoText', () => {
    it('next item of id: 1 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '1');
      expect(actual.id).toEqual('2');
    });

    it('next item of id: 2 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '2');
      expect(actual.id).toEqual('3');
    });

    it('next item of id: 3 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '3');
      expect(actual.id).toEqual('4');
    });

    it('next item of id: 4 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '4');
      expect(actual.id).toEqual('5');
    });

    it('next item of id: 5 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '5');
      expect(actual.id).toEqual('6');
    });

    it('next item of id: 6 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '6');
      expect(actual.id).toEqual('7');
    });

    it('next item of id: 7 is an item', () => {
      const actual: IItem = <IItem>traverse.findNextSkipNoText(sampleItems, '7');
      expect(actual.id).toEqual('8');
    });

    it('next item of id: 8 is null', () => {
      const actual: IItem | null = traverse.findNextSkipNoText(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });
});
