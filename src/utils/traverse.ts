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
  addBefore(items: IItem[], id: string): IItem | null;
  addAfter(items: IItem[], id: string): IItem | null;
  destroy(items: IItem[], id: string): void;
  // transform
  indent(items: IItem[], id: string): void;
  unindent(items: IItem[], id: string): void;
  merge(id: string, newItem: IItem): IItem;
  turnInto(id: string, style: string): IItem;
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
  addBefore: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        const newItem: ITextItem = {
          id: uuid(),
          style: 'TEXT',
          text: '',
          indent: traverse.hasIndent(item) ? item.indent : 0,
        };
        items.splice(i, 0, newItem);

        return newItem;
      }
    }

    return null;
  },
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
  indent(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        const prevItem: IItem | null = items[i - 1] || null;
        if (prevItem) {
          if (traverse.hasIndent(prevItem)) {
            items.splice(i, 1);
            prevItem.children.push(item);

            return;
          }
        }
      } else {
        if (traverse.hasIndent(item)) {
          traverse.indent(item.children, id);
        }
      }
    }
  },
  unindent(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (traverse.hasIndent(item)) {
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            item.children.splice(j, 1);
            items.splice(i + 1, 0, childItem);

            return;
          }
        }
        traverse.unindent(item.children, id);
      }
    }
  },
  destroy(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        items.splice(i, 1);

        return;
      } else {
        if (traverse.hasIndent(item)) {
          traverse.destroy(item.children, id);
        }
      }
    }
  },
  cancel(items: IItem[], id: string, context?: { depth: number }): void {
    // TODO: textの有無によって振る舞いが変わる。ので、ちゃんと整理
    // TEXTじゃない場合
    //  TEXTに変換
    // 親がいない
    //  childrenをunshiftしてdestroy
    // 親がいる & 兄がいる & 弟がいる
    //  childrenをunshiftしてdestroy
    // 親がいる & 兄がいる & 弟がいない
    //  unindent

    const ctx: { depth: number } = context ? context : { depth: 0 };
    const hasParent: boolean = ctx.depth !== 0;

    for (const item of items) {
      if (item.style !== 'TEXT' && item.id === id) {
        traverse.turnInto(item, 'TEXT');

        return;
      }

      if (!hasParent && item.id === id) {
        if (traverse.hasIndent(item)) {
          for (let j: number = item.children.length - 1; j >= 0; j -= 1) {
            traverse.unindent(items, item.children[j].id);
          }
        }
        traverse.destroy(items, id);

        return;
      }

      if (traverse.hasIndent(item)) {
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            const hasPreItem: boolean = !!item.children[j - 1];
            const hasSufItem: boolean = !!item.children[j + 1];

            if (childItem.style !== 'TEXT') {
              traverse.turnInto(childItem, 'TEXT');

              return;
            } else if (hasPreItem && hasSufItem) {
              if (traverse.hasIndent(childItem)) {
                for (let k: number = childItem.children.length - 1; k >= 0; k -= 1) {
                  traverse.unindent(items, childItem.children[k].id);
                }
              }
              traverse.destroy(items, id);

              return;
            } else {
              traverse.unindent(items, id);

              return;
            }
          }
        }
      }

      if (traverse.hasIndent(item)) {
        traverse.cancel(item.children, id, { depth: ctx.depth + 1 });
      }
    }
  },
  moveBefore: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 一つ前のアイテムに子がいればこの末尾に
    // 子がいなければ前に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.find(items, id);
    if (item) {
      ctx.item = item;
      traverse.destroy(items, id);
    }

    if (ctx.item) {
      for (let i: number = 0; i < items.length; i += 1) {
        const targetItem: IItem = items[i];
        const prevItem: IItem | null = items[i - 1] || null;
        if (targetItem.id === toId) {
          if (prevItem && traverse.hasIndent(prevItem) && prevItem.children.length > 0) {
            prevItem.children.push(ctx.item);
          } else {
            items.splice(i, 0, ctx.item);
          }

          return;
        } else {
          if (traverse.hasIndent(targetItem)) {
            traverse.moveBefore(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
  moveAfter: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 子がいれば子の先頭に
    // 子がいなければ次に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.find(items, id);
    if (item) {
      ctx.item = item;
      traverse.destroy(items, id);
    }

    if (ctx.item) {
      for (let i: number = 0; i < items.length; i += 1) {
        const targetItem: IItem = items[i];
        if (targetItem.id === toId) {
          if (targetItem !== null && traverse.hasIndent(targetItem) && targetItem.children.length > 0) {
            targetItem.children.unshift(ctx.item);
          } else {
            items.splice(i + 1, 0, ctx.item);
          }

          return;
        } else {
          if (traverse.hasIndent(targetItem)) {
            traverse.moveAfter(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
  merge: (
    item: IItem,
    newItem: {
      id?: string;
      style: string;
      text?: string;
      children?: IItem[];
      completed?: boolean | undefined;
      opened?: boolean | undefined;
    },
  ): IItem => {
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign(item, newItem);
  },
  turnInto: (item: IItem, style: string): IItem => {
    if (item.style !== style) {
      switch (style) {
        case 'TEXT': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: traverse.hasIndent(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
        }
        case 'BULLETED': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: traverse.hasIndent(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
        }
        case 'NUMBERED': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: traverse.hasIndent(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
        }
        case 'TASK': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: traverse.hasIndent(item) ? item.children : [],
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
            children: traverse.hasIndent(item) ? item.children : [],
            completed: undefined,
            opened: false,
          });
        }
        case 'HEADER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: undefined,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'SUBHEADER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: traverse.hasText(item) ? item.text : '',
            children: undefined,
            completed: undefined,
            opened: undefined,
          });
        }
        case 'DIVIDER': {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign(item, {
            style,
            text: undefined,
            children: undefined,
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
