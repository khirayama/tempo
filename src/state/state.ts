// NOTE:
// traverse prev, next, parent

export type IItem = ITextableItem | IDividerItem;

export type ITextableItem =
  | ITextItem
  | IBulletedItem
  | INumberedItem
  | ITaskItem
  | IToggleItem
  | IHeaderItem
  | IQuateItem;

export interface ITextItem {
  id: string;
  style: 'TEXT';
  text: string;
  children: IItem[];
}

export interface IBulletedItem {
  id: string;
  style: 'BULLETED';
  text: string;
  children: IItem[];
}

export interface INumberedItem {
  id: string;
  style: 'NUMBERED';
  text: string;
  children: IItem[];
}

export interface ITaskItem {
  id: string;
  style: 'TASK';
  text: string;
  completed: boolean;
  children: IItem[];
}

export interface IToggleItem {
  id: string;
  style: 'TOGGLE';
  text: string;
  opened: boolean;
  children: IItem[];
}

export interface IHeaderItem {
  id: string;
  style: 'HEADER';
  text: string;
}

export interface IQuateItem {
  id: string;
  style: 'QUOTE';
  text: string;
}

export interface IDividerItem {
  id: string;
  style: 'DIVIDER';
}

export interface IPage {
  id: string;
  title: string;
  items: IItem[];
}

export interface IUI {
  focusedId: null | string;
}

export interface IState {
  ui: IUI;
  pages: IPage[];
}

const sampleState: IState = {
  ui: {
    focusedId: null,
  },
  pages: [
    {
      id: '1',
      title: 'ALL SAMPLE',
      items: [
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
      ],
    },
  ],
};

export const initialState: IState = sampleState;
