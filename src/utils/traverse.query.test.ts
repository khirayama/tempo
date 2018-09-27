import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';
import { sampleItems, sampleItems2, sampleItems3 } from 'utils/traverse.samples';

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
      const actual: IItem | null = traverse.find(sampleItems, '1');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('id: 2 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('id: 3 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('id: 4 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('id: 5 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('id: 6 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('id: 7 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('id: 8 is an item', () => {
      const actual: IItem | null = traverse.find(sampleItems, '8');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('id: 9 is null', () => {
      const actual: IItem | null = traverse.find(sampleItems, '9');
      expect(actual).toEqual(null);
    });
  });

  describe('findParent', () => {
    it('find parent of id: 1', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find parent of id: 2', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 3', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 4', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 5', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 6', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 7', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 8', () => {
      const actual: IItem | null = traverse.findParent(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });

  describe('findParentBrother', () => {
    it('find parent brother of id: 1', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find parent brother of id: 2', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 3', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 4', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 5', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 6', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 7', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 8', () => {
      const actual: IItem | null = traverse.findParentBrother(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });

  describe('findLastChild', () => {
    it('find last child of id: 1', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '1');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        if (actual !== null) {
          expect(actual.id).toEqual('7');
        } else {
          throw new Error('null');
        }
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 2', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '2');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 3', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '3');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        if (actual !== null) {
          expect(actual.id).toEqual('5');
        } else {
          throw new Error('null');
        }
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 4', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '4');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 5', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '5');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 6', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '6');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 7', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '7');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });

    it('find last child of id: 8', () => {
      const targetItem: IItem | null = traverse.find(sampleItems, '8');
      if (targetItem !== null) {
        const actual: IItem | null = traverse.findLastChild(targetItem);
        expect(actual).toEqual(null);
      } else {
        throw new Error('null');
      }
    });
  });

  describe('findUpper', () => {
    it('find upper of id: 1', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find upper of id: 2', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 3', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 4', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 5', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 6', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 7', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 8', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems, '8');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('sampleItems2: find upper of id: 4', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems2, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });
  });

  describe('findUpperSkipNoText', () => {
    it('find upper skip no text of id: 1', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find upper skip no text of id: 2', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 3', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 4', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 5', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 6', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 7', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find upper skip no text of id: 8', () => {
      const actual: IItem | null = traverse.findUpperSkipNoText(sampleItems, '8');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('sampleItems2: find upper of id: 4', () => {
      const actual: IItem | null = traverse.findUpper(sampleItems2, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });
  });

  describe('findDowner', () => {
    it('find downer of id: 1', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '1');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 2', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 3', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 4', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 5', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 6', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 7', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 8', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems, '8');
      expect(actual).toEqual(null);
    });

    it('sampleItems2: find downer of id: 3', () => {
      const actual: IItem | null = traverse.findDowner(sampleItems2, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });
  });

  describe('findDownerSkipNoText', () => {
    it('find downer skip no text of id: 1', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '1');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 2', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 3', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 4', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 5', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 6', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 7', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find downer skip no text of id: 8', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems, '8');
      expect(actual).toEqual(null);
    });

    it('sampleItems2: find downer skip no text of id: 3', () => {
      const actual: IItem | null = traverse.findDownerSkipNoText(sampleItems2, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });
  });
});
