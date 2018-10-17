export type IItem =
  | ITextItem
  | IBulletedItem
  | INumberedItem
  | ITaskItem
  | IToggleItem
  | IHeaderItem
  | ISubHeaderItem
  | IQuateItem
  | IDividerItem;

export interface ITextItem {
  id: string;
  style: 'TEXT';
  text: string;
  indent: number;
}

export interface IBulletedItem {
  id: string;
  style: 'BULLETED';
  text: string;
  indent: number;
}

export interface INumberedItem {
  id: string;
  style: 'NUMBERED';
  text: string;
  indent: number;
}

export interface ITaskItem {
  id: string;
  style: 'TASK';
  text: string;
  completed: boolean;
  indent: number;
}

export interface IToggleItem {
  id: string;
  style: 'TOGGLE';
  text: string;
  opened: boolean;
  indent: number;
}

export interface IHeaderItem {
  id: string;
  style: 'HEADER';
  text: string;
}

export interface ISubHeaderItem {
  id: string;
  style: 'SUBHEADER';
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

export interface IPaper {
  id: string;
  items: IItem[];
}

export interface IBinder {
  id: string;
  papers: IPaper[];
}

export interface IUI {
  inputValue: string;
  selection: {
    start: number | null;
    end: number | null;
  };
  focusedId: null | string;
  selectedIds: string[];
}

export interface IState {
  ui: IUI;
  binders: IBinder[];
}

const emptyState: IState = {
  ui: {
    inputValue: '',
    selection: {
      start: null,
      end: null,
    },
    focusedId: '1',
    selectedIds: [],
  },
  binders: [
    {
      id: '1',
      papers: [
        {
          id: '1',
          items: [
            {
              id: '1',
              style: 'TEXT',
              text: '',
              indent: 0,
            },
          ],
        },
      ],
    },
  ],
};

export const initialState: IState = emptyState;
