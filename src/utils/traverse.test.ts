// tslint:disable:no-any
import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';

/*
- id: 1
  - id: 2
  - id: 3
    - id: 4
    - id: 5
- id: 6
*/

const sampleItems: IItem[] = [
  {
    id: '1',
    style: 'TEXT',
    text: 'text 1',
    children: [
      {
        id: '2',
        style: 'TEXT',
        text: 'text 2',
        children: [],
      },
      {
        id: '3',
        style: 'TEXT',
        text: 'text 3',
        children: [
          {
            id: '4',
            style: 'TEXT',
            text: 'text 4',
            children: [],
          },
          {
            id: '5',
            style: 'TEXT',
            text: 'text 5',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '6',
    style: 'TEXT',
    text: 'text 6',
    children: [],
  },
];

function copyItems(items: IItem[]): IItem[] {
  return JSON.parse(JSON.stringify(items));
}

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

    it('id: 7 is null', () => {
      const actual: IItem | null = traverse.find(sampleItems, '7');
      expect(actual).toEqual(null);
    });
  });

  describe('addItem', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '1', '7');
      expect(items[0].id).toEqual('1');
      expect(items[1].id).toEqual('7');
      expect(items[1].children[0].id).toEqual('2');
      expect(items[1].children[1].id).toEqual('3');
      expect(items[1].children[1].children[0].id).toEqual('4');
      expect(items[1].children[1].children[1].id).toEqual('5');
      expect(items[2].id).toEqual('6');
    });

    it('add an item after id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '2', '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('7');
      expect(items[0].children[2].id).toEqual('3');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('add an item after id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '3', '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[0].children[2].children[0].id).toEqual('4');
      expect(items[0].children[2].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('add an item after id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '4', '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('7');
      expect(items[0].children[1].children[2].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('add an item after id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '5', '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('6');
    });

    it('add an item after id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '6', '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
      expect(items[2].id).toEqual('7');
    });
  });

  describe('shiftItem', () => {
    it('shift id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('shift id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('shift id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[1].id).toEqual('4');
      expect(items[0].children[0].children[2].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('shift id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('shift id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[0].children[0].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });

    it('shift id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
    });

    it('shift id: 7(nothing)', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[1].id).toEqual('6');
    });
  });
});
