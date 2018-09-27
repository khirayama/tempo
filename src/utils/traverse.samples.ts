import { IItem } from 'state/state';

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

export function copyItems(items: IItem[]): IItem[] {
  return JSON.parse(JSON.stringify(items));
}

export const sampleItems: IItem[] = [
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

export const sampleItems2: IItem[] = [
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

export const sampleItems3: IItem[] = [
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
