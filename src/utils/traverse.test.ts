// tslint:disable:no-any
import { IItem } from 'state/state';
import { traverse } from 'utils/traverse';

/*
sampleItems
- id: 1
  - id: 2
  - id: 3
    - id: 4
    - id: 5
  - id: 6
  - id: 7
- id: 8

expect(items[0].id).toEqual('1');
expect(items[0].children[0].id).toEqual('2');
expect(items[0].children[1].id).toEqual('3');
expect(items[0].children[1].children[0].id).toEqual('4');
expect(items[0].children[1].children[1].id).toEqual('5');
expect(items[0].children[2].id).toEqual('6');
expect(items[0].children[3].id).toEqual('7');
expect(items[1].id).toEqual('8');

- - -

sampleItems2
- id: 1
  - id: 2
    - id: 3
- id: 4

expect(items[0].id).toEqual('1');
expect(items[0].children[0].id).toEqual('2');
expect(items[0].children[0].children[0].id).toEqual('3');

- - -

sampleItems3
- id: 2 TEXT
  - id: 3 TEXT
  - id: 4 TEXT
- id: 28 DIVIDER
- id: 9 HEADER
- id: 5 TASK false
  - id: 6 TASK false
  - id: 7 TASK true
  - id: 8 TASK false
- id: 10 BULLETED
  - id: 11 BULLETED
  - id: 12 BULLETED
  - id: 13 BULLETED
- id: 14 NUMBERED
  - id: 15 NUMBERED
  - id: 16 NUMBERED
  - id: 17 NUMBERED
  - id: 31 DIVIDER
  - id: 32 NUMBERED
- id: 18 TOGGLE false
  - id: 19 TOGGLE false
    - id: 22 TEXT
    - id: 23 TEXT
  - id: 20 TOGGLE true
    - id: 33 TEXT
    - id: 34 TEXT
  - id: 21 TOGGLE false
    - id: 26 TEXT
    - id: 27 TEXT
- id: 30 QUOTE

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
      {
        id: '6',
        style: 'TEXT',
        text: 'text 6',
        children: [],
      },
      {
        id: '7',
        style: 'TEXT',
        text: 'text 7',
        children: [],
      },
    ],
  },
  {
    id: '8',
    style: 'TEXT',
    text: 'text 8',
    children: [],
  },
];

const sampleItems2: IItem[] = [
  {
    id: '1',
    style: 'TEXT',
    text: 'text 1',
    children: [
      {
        id: '2',
        style: 'TEXT',
        text: 'text 2',
        children: [
          {
            id: '3',
            style: 'TEXT',
            text: 'text 3',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    style: 'TEXT',
    text: 'text 4',
    children: [],
  },
];

const sampleItems3: IItem[] = [
  {
    id: '2',
    style: 'TEXT',
    text: 'Sample Text 2',
    children: [
      {
        id: '3',
        style: 'TEXT',
        text: 'Sample Text 3',
        children: [],
      },
      {
        id: '4',
        style: 'TEXT',
        text: 'Sample Text 4',
        children: [],
      },
    ],
  },
  {
    id: '28',
    style: 'DIVIDER',
  },
  {
    id: '9',
    style: 'HEADER',
    text: 'TODO LIST',
  },
  {
    id: '5',
    style: 'TASK',
    text: 'Task 1',
    completed: false,
    children: [
      {
        id: '6',
        style: 'TASK',
        text: 'Task 2',
        completed: false,
        children: [],
      },
      {
        id: '7',
        style: 'TASK',
        text: 'Task 3',
        completed: true,
        children: [],
      },
      {
        id: '8',
        style: 'TASK',
        text: 'Task 4',
        completed: false,
        children: [],
      },
    ],
  },
  {
    id: '10',
    style: 'BULLETED',
    text: 'bulleted 1',
    children: [
      {
        id: '11',
        style: 'BULLETED',
        text: 'bulleted 2',
        children: [],
      },
      {
        id: '12',
        style: 'BULLETED',
        text: 'bulleted 3',
        children: [],
      },
      {
        id: '13',
        style: 'BULLETED',
        text: 'bulleted 4',
        children: [],
      },
    ],
  },
  {
    id: '14',
    style: 'NUMBERED',
    text: 'numbered 1',
    children: [
      {
        id: '15',
        style: 'NUMBERED',
        text: 'numbered 2',
        children: [],
      },
      {
        id: '16',
        style: 'NUMBERED',
        text: 'numbered 3',
        children: [],
      },
      {
        id: '17',
        style: 'NUMBERED',
        text: 'numbered 4',
        children: [],
      },
      {
        id: '31',
        style: 'DIVIDER',
      },
      {
        id: '32',
        style: 'NUMBERED',
        text: 'numbered 1',
        children: [],
      },
    ],
  },
  {
    id: '18',
    style: 'TOGGLE',
    text: 'toggle 1',
    opened: false,
    children: [
      {
        id: '19',
        style: 'TOGGLE',
        text: 'toggle 2',
        opened: false,
        children: [
          {
            id: '22',
            style: 'TEXT',
            text: 'toggle child 1',
            children: [],
          },
          {
            id: '23',
            style: 'TEXT',
            text: 'toggle child 2',
            children: [],
          },
        ],
      },
      {
        id: '20',
        style: 'TOGGLE',
        text: 'toggle 3',
        opened: true,
        children: [
          {
            id: '33',
            style: 'TEXT',
            text: 'toggle child 1',
            children: [],
          },
          {
            id: '34',
            style: 'TEXT',
            text: 'toggle child 2',
            children: [],
          },
        ],
      },
      {
        id: '21',
        style: 'TOGGLE',
        text: 'toggle 4',
        opened: false,
        children: [
          {
            id: '26',
            style: 'TEXT',
            text: 'toggle child 1',
            children: [],
          },
          {
            id: '27',
            style: 'TEXT',
            text: 'toggle child 2',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '30',
    style: 'QUOTE',
    text: 'When in Rome, do as the Romans do.',
  },
];

function copyItems(items: IItem[]): IItem[] {
  return JSON.parse(JSON.stringify(items));
}

describe('traverse', () => {
  describe('findItem', () => {
    it('id: 1 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '1');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('id: 2 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('id: 3 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('id: 4 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('id: 5 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('id: 6 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('id: 7 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('id: 8 is an item', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '8');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('id: 9 is null', () => {
      const actual: IItem | null = traverse.findItem(sampleItems, '9');
      expect(actual).toEqual(null);
    });
  });

  describe('findParentItem', () => {
    it('find parent of id: 1', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find parent of id: 2', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 3', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 4', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 5', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 6', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 7', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find parent of id: 8', () => {
      const actual: IItem | null = traverse.findParentItem(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });

  describe('findParentBrotherItem', () => {
    it('find parent brother of id: 1', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find parent brother of id: 2', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 3', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 4', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 5', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 6', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 7', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find parent brother of id: 8', () => {
      const actual: IItem | null = traverse.findParentBrotherItem(sampleItems, '8');
      expect(actual).toEqual(null);
    });
  });

  describe('findUpperItem', () => {
    it('find upper of id: 1', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '1');
      expect(actual).toEqual(null);
    });

    it('find upper of id: 2', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('1');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 3', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 4', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 5', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 6', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 7', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find upper of id: 8', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems, '8');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('sampleItems2: find upper of id: 4', () => {
      const actual: IItem | null = traverse.findUpperItem(sampleItems2, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });
  });

  describe('findDownerItem', () => {
    it('find downer of id: 1', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '1');
      if (actual !== null) {
        expect(actual.id).toEqual('2');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 2', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '2');
      if (actual !== null) {
        expect(actual.id).toEqual('3');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 3', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 4', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '4');
      if (actual !== null) {
        expect(actual.id).toEqual('5');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 5', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '5');
      if (actual !== null) {
        expect(actual.id).toEqual('6');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 6', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '6');
      if (actual !== null) {
        expect(actual.id).toEqual('7');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 7', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '7');
      if (actual !== null) {
        expect(actual.id).toEqual('8');
      } else {
        throw new Error('null');
      }
    });

    it('find downer of id: 8', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems, '8');
      expect(actual).toEqual(null);
    });

    it('sampleItems2: find downer of id: 3', () => {
      const actual: IItem | null = traverse.findDownerItem(sampleItems2, '3');
      if (actual !== null) {
        expect(actual.id).toEqual('4');
      } else {
        throw new Error('null');
      }
    });
  });

  describe('addItem', () => {
    it('add an item after id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '1', '9');
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
      traverse.addItem(items, '2', '9');
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
      traverse.addItem(items, '3', '9');
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
      traverse.addItem(items, '4', '9');
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
      traverse.addItem(items, '5', '9');
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
      traverse.addItem(items, '6', '9');
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
      traverse.addItem(items, '7', '9');
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
      traverse.addItem(items, '8', '9');
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

  describe('shiftItem', () => {
    it('shift id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[0].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[1].children[2].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[2].children[0].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('shift id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.shiftItem(items, '8');
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

  describe('unshiftItem', () => {
    it('unshift id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '1');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unshift id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('2');
      expect(items[2].id).toEqual('8');
    });

    it('unshift id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('3');
      expect(items[1].children[0].id).toEqual('4');
      expect(items[1].children[1].id).toEqual('5');
      expect(items[2].id).toEqual('8');
    });

    it('unshift id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('4');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unshift id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[2].id).toEqual('5');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('unshift id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('6');
      expect(items[2].id).toEqual('8');
    });

    it('unshift id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[1].id).toEqual('7');
      expect(items[2].id).toEqual('8');
    });

    it('unshift id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.unshiftItem(items, '8');
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

  describe('deleteItem', () => {
    it('delete id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '1');
      expect(items[0].id).toEqual('8');
    });

    it('delete id: 2', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '2');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('3');
      expect(items[0].children[0].children[0].id).toEqual('4');
      expect(items[0].children[0].children[1].id).toEqual('5');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 3', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('6');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 4', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '4');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 5', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '5');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 6', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '6');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('7');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 7', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '7');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[1].id).toEqual('8');
    });

    it('delete id: 8', () => {
      const items: any = copyItems(sampleItems);
      traverse.deleteItem(items, '8');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
    });
  });

  describe('cancelItem', () => {
    it('add id: 9 after id: 1 and cancel id: 9', () => {
      const items: any = copyItems(sampleItems);
      traverse.addItem(items, '1', '9');
      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '2', '9');
      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '3', '9');
      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '4', '9');
      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '5', '9');
      traverse.cancelItem(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('9');
      expect(items[0].children[3].id).toEqual('6');
      expect(items[0].children[4].id).toEqual('7');
      expect(items[1].id).toEqual('8');

      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '6', '9');
      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '7', '9');
      traverse.cancelItem(items, '9');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[0].children[1].children[0].id).toEqual('4');
      expect(items[0].children[1].children[1].id).toEqual('5');
      expect(items[0].children[2].id).toEqual('6');
      expect(items[0].children[3].id).toEqual('7');
      expect(items[1].id).toEqual('9');
      expect(items[2].id).toEqual('8');

      traverse.cancelItem(items, '9');
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
      traverse.addItem(items, '8', '9');
      traverse.cancelItem(items, '9');
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
      traverse.cancelItem(items, '3');
      expect(items[0].id).toEqual('1');
      expect(items[0].children[0].id).toEqual('2');
      expect(items[0].children[1].id).toEqual('3');
      expect(items[1].id).toEqual('4');
    });
  });

  describe('prependItem', () => {
    it('move id: 8 before id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.prependItem(items, '8', '1');

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
      traverse.prependItem(items, '8', '2');

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
      traverse.prependItem(items, '8', '3');

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
      traverse.prependItem(items, '8', '4');

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
      traverse.prependItem(items, '8', '5');

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
      traverse.prependItem(items, '8', '6');

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
      traverse.prependItem(items, '8', '7');

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
      traverse.prependItem(items, '1', '8');

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

  describe('appendItem', () => {
    it('move id: 8 after id: 1', () => {
      const items: any = copyItems(sampleItems);
      traverse.appendItem(items, '8', '1');
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
      traverse.appendItem(items, '8', '2');
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
      traverse.appendItem(items, '8', '3');
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
      traverse.appendItem(items, '8', '4');
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
      traverse.appendItem(items, '8', '5');

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
      traverse.appendItem(items, '8', '6');

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
      traverse.appendItem(items, '8', '7');

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
      traverse.appendItem(items, '1', '8');

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
