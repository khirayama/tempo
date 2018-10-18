// tslint:disable:no-any
import * as uuid from 'uuid/v4';

import {
  IBulletedItem,
  IHeaderItem,
  IItem,
  INumberedItem,
  IQuateItem,
  ISubHeaderItem,
  ITaskItem,
  ITextItem,
  IToggleItem,
} from 'state/state';

export const traverse: {
  hasIndent(item: IItem | null): item is ITextItem | IBulletedItem | INumberedItem | ITaskItem | IToggleItem;
  hasText(
    item: IItem | null,
  ): item is
    | ITextItem
    | IBulletedItem
    | INumberedItem
    | ITaskItem
    | ITaskItem
    | IToggleItem
    | IHeaderItem
    | IQuateItem
    | ISubHeaderItem;
  // query
  find(items: IItem[], id: string): IItem | null;
  findPrev(items: IItem[], id: string): IItem | null;
  findPrevSkipNoText(items: IItem[], id: string): IItem | null;
  findNext(items: IItem[], id: string): IItem | null;
  findNextSkipNoText(items: IItem[], id: string): IItem | null;
  // command
  addAfter(items: IItem[], id: string): IItem | null;
  remove(items: IItem[], id: string): void;
  // transform
  merge(item: IItem, newItem: IItem): IItem;
  indent(items: IItem[], id: string): void;
  unindent(items: IItem[], id: string): void;
  turnInto(item: IItem, style: string): IItem;
} = {
  hasIndent(item: IItem | null): item is ITextItem | IBulletedItem | INumberedItem | ITaskItem | IToggleItem {
    if (item === null) {
      return false;
    }

    return (
      item.style === 'TEXT' ||
      item.style === 'BULLETED' ||
      item.style === 'NUMBERED' ||
      item.style === 'TASK' ||
      (item.style === 'TOGGLE' && item.opened)
    );
  },
  hasText(
    item: IItem | null,
  ): item is
    | ITextItem
    | IBulletedItem
    | INumberedItem
    | ITaskItem
    | ITaskItem
    | IToggleItem
    | IHeaderItem
    | ISubHeaderItem
    | IQuateItem {
    if (item === null) {
      return false;
    }

    return (
      item.style === 'TEXT' ||
      item.style === 'BULLETED' ||
      item.style === 'NUMBERED' ||
      item.style === 'TASK' ||
      item.style === 'TOGGLE' ||
      item.style === 'HEADER' ||
      item.style === 'SUBHEADER' ||
      item.style === 'QUOTE'
    );
  },
  // query
  find: (items: IItem[], id: string): IItem | null => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
    }

    return null;
  },
  findPrev: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        return items[i - 1] || null;
      }
    }

    return null;
  },
  findPrevSkipNoText: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        let j: number = 1;
        while (j <= i) {
          const prevItem: IItem | null = items[i - j] || null;

          if (prevItem === null) {
            return null;
          } else if (traverse.hasText(prevItem)) {
            return prevItem;
          }

          j += 1;
        }
      }
    }

    return null;
  },
  findNext: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        return items[i + 1] || null;
      }
    }

    return null;
  },
  findNextSkipNoText: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        let j: number = 1;
        while (j <= items.length - i) {
          const nextItem: IItem | null = items[i + j] || null;

          if (nextItem === null) {
            return null;
          } else if (traverse.hasText(nextItem)) {
            return nextItem;
          }

          j += 1;
        }
      }
    }

    return null;
  },
  // command
  addAfter: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        const newItem: ITextItem = {
          id: uuid(),
          style: 'TEXT',
          text: '',
          indent: traverse.hasIndent(item) ? item.indent : 0,
        };
        items.splice(i + 1, 0, newItem);

        return newItem;
      }
    }

    return null;
  },
  remove(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        items.splice(i, 1);
      }
    }
  },
  // transform
  merge: (
    item: IItem,
    newItem: {
      id?: string;
      style?: string;
      text?: string;
      indent?: number;
      completed?: boolean | undefined;
      opened?: boolean | undefined;
    },
  ): IItem => {
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign(item, newItem);
  },
  indent(items: IItem[], id: string): IItem | null {
    const item: IItem | null = traverse.find(items, id);
    if (item !== null && traverse.hasIndent(item)) {
      item.indent = Math.min(item.indent + 1, 8);

      return item;
    }

    return null;
  },
  unindent(items: IItem[], id: string): IItem | null {
    const item: IItem | null = traverse.find(items, id);
    if (item !== null && traverse.hasIndent(item)) {
      item.indent = Math.max(item.indent - 1, 0);

      return item;
    }

    return null;
  },
  // tslint:disable-next-line:cyclomatic-complexity
  turnInto: (item: IItem, style: string): IItem => {
    if (item.style !== style) {
      switch (style) {
        case 'TEXT': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: traverse.hasIndent(item) ? item.indent : 0,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'BULLETED': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: traverse.hasIndent(item) ? item.indent : 0,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'NUMBERED': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: traverse.hasIndent(item) ? item.indent : 0,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'TASK': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: traverse.hasIndent(item) ? item.indent : 0,
            completed: false,
            opened: undefined,
          });
          break;
        }
        case 'TOGGLE': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: traverse.hasIndent(item) ? item.indent : 0,
            completed: undefined,
            opened: false,
          });
        }
        case 'HEADER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: undefined,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'SUBHEADER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            indent: undefined,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'DIVIDER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: undefined,
            indent: undefined,
            completed: undefined,
            opened: undefined,
          });
        }
        default:
      }
    }

    return item;
  },
};
