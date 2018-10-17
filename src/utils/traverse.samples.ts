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

- - -

sampleItems
- id: 1 HEADER
- id: 2 TEXT
  - id: 3 TEXT
  - id: 4 TEXT
- id: 28 DIVIDER
- id: 9 SUBHEADER
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
    indent: 0,
  },
  {
    id: '2',
    style: 'TEXT',
    text: 'text 2',
    indent: 1,
  },
  {
    id: '3',
    style: 'TEXT',
    text: 'text 3',
    indent: 1,
  },
  {
    id: '4',
    style: 'TEXT',
    text: 'text 4',
    indent: 2,
  },
  {
    id: '5',
    style: 'TEXT',
    text: 'text 5',
    indent: 2,
  },
  {
    id: '6',
    style: 'TEXT',
    text: 'text 6',
    indent: 1,
  },
  {
    id: '7',
    style: 'TEXT',
    text: 'text 7',
    indent: 1,
  },
  {
    id: '8',
    style: 'TEXT',
    text: 'text 8',
    indent: 0,
  },
];
