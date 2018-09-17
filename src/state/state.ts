export interface IItem {
  id: string;
  style: 'HEADER' | 'TEXT' | 'TASK' | 'BULLETED' | 'NUMBERED' | 'TOGGLE' | 'QUOTE' | 'DIVIDER';
  text?: string; // For except DIVIDER
  completed?: boolean; // For TASK
  opened?: boolean; // For TOGGLE
  children?: IItem[]; // For except HEADER, QUOTE and DIVIDER
}

export interface IPage {
  title: string;
  items: IItem[];
}

export interface IState {
  pages: IPage[];
}

const sampleState: IState = {
  pages: [
    {
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
          ],
        },
        {
          id: '18',
          style: 'TOGGLE',
          text: 'toggle 1',
          children: [
            {
              id: '19',
              style: 'TOGGLE',
              text: 'toggle 2',
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
              children: [
                {
                  id: '24',
                  style: 'TEXT',
                  text: 'toggle child 1',
                  children: [],
                },
                {
                  id: '24',
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
