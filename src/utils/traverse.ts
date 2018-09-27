import * as uuid from 'uuid/v4';

import {
  IBulletedItem,
  IHeaderItem,
  IItem,
  INumberedItem,
  IQuateItem,
  ITaskItem,
  ITextItem,
  IToggleItem,
} from 'state/state';

function hasChildren(item: IItem): item is ITextItem | IBulletedItem | INumberedItem | ITaskItem | IToggleItem {
  return (
    item.style === 'TEXT' ||
    item.style === 'BULLETED' ||
    item.style === 'NUMBERED' ||
    item.style === 'TASK' ||
    (item.style === 'TOGGLE' && item.opened)
  );
}

function hasText(
  item: IItem,
): item is ITextItem | IBulletedItem | INumberedItem | ITaskItem | ITaskItem | IToggleItem | IHeaderItem | IQuateItem {
  return (
    item.style === 'TEXT' ||
    item.style === 'BULLETED' ||
    item.style === 'NUMBERED' ||
    item.style === 'TASK' ||
    item.style === 'TOGGLE' ||
    item.style === 'HEADER' ||
    item.style === 'QUOTE'
  );
}

export const traverse: {
  findItem(items: IItem[], id: string): IItem | null;
  findParentItem(items: IItem[], id: string): IItem | null;
  findParentBrotherItem(items: IItem[], id: string): IItem | null;
  findLastChildItem(item: IItem): IItem | null;
  findUpperItem(items: IItem[], id: string): IItem | null;
  findUpperItemSkipNoTextItem(items: IItem[], id: string): IItem | null;
  findDownerItem(items: IItem[], id: string, context?: { rootItems: IItem[] }): IItem | null;
  findDownerItemSkipNoTextItem(items: IItem[], id: string): IItem | null;
  addItem(items: IItem[], prevId: string, newId?: string): IItem | null;
  shiftItem(items: IItem[], id: string): void;
  unshiftItem(items: IItem[], id: string): void;
  deleteItem(items: IItem[], id: string): void;
  cancelItem(items: IItem[], id: string, context?: { depth: number }): void;
  prependItem(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
  appendItem(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
  turnInto(item: IItem, style: string): void;
} = {
  findItem: (items: IItem[], id: string): IItem | null => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      } else {
        if (hasChildren(item)) {
          const result: IItem | null = traverse.findItem(item.children, id);
          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  },
  findParentItem: (items: IItem[], id: string): IItem | null => {
    for (const item of items) {
      if (hasChildren(item)) {
        for (const childItem of item.children) {
          if (childItem.id === id) {
            return item;
          }
        }

        const result: IItem | null = traverse.findParentItem(item.children, id);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  },
  findLastChildItem: (item: IItem): IItem | null => {
    if (hasChildren(item) && item.children.length) {
      const lastChild: IItem = item.children[item.children.length - 1];
      if (hasChildren(lastChild) && lastChild.children.length) {
        return traverse.findLastChildItem(lastChild);
      } else {
        return lastChild;
      }
    }

    return null;
  },
  findParentBrotherItem: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (hasChildren(item)) {
        for (const childItem of item.children) {
          if (childItem.id === id) {
            return items[i + 1] || null;
          }
        }

        const result: IItem | null = traverse.findParentBrotherItem(item.children, id);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  },
  findUpperItem: (items: IItem[], id: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];

      if (item.id === id) {
        const prevItem: IItem | null = items[i - 1] || null;

        if (prevItem !== null && hasChildren(prevItem) && prevItem.children.length) {
          const result: IItem | null = traverse.findLastChildItem(prevItem);
          if (result !== null) {
            return result;
          }
        }

        return prevItem;
      } else if (hasChildren(item)) {
        // 次に行く前に子供のチェック
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            if (j === 0) {
              return item;
            } else {
              const prevItem: IItem | null = item.children[j - 1] || null;

              if (prevItem !== null && hasChildren(prevItem) && prevItem.children.length) {
                const result: IItem | null = traverse.findLastChildItem(prevItem);
                if (result !== null) {
                  return result;
                }
              }

              return prevItem;
            }
          }
        }
      }

      if (hasChildren(item)) {
        const result: IItem | null = traverse.findUpperItem(item.children, id);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  },
  findUpperItemSkipNoTextItem: (items: IItem[], id: string): IItem | null => {
    const item: IItem | null = traverse.findUpperItem(items, id);
    if (item !== null && item.style === 'DIVIDER') {
      return traverse.findUpperItemSkipNoTextItem(items, item.id);
    }

    return item;
  },
  findDownerItem: (items: IItem[], id: string, context?: { rootItems: IItem[] }): IItem | null => {
    // 自分に子がいれば、一番上の子
    // 子がいなければ、弟
    // 子も弟もいなければ、親の弟
    // 親の弟もいなければ、親の親の弟(親なしまで繰り返す)

    const ctx: { rootItems: IItem[] } = context ? context : { rootItems: items };
    function findParentsBrotherItem(rootItems: IItem[], shadowId: string): IItem | null {
      const parentBrotherItem: IItem | null = traverse.findParentBrotherItem(rootItems, shadowId);
      if (parentBrotherItem !== null) {
        return parentBrotherItem;
      } else {
        const parentItem: IItem | null = traverse.findParentItem(rootItems, shadowId);
        if (parentItem !== null) {
          return findParentsBrotherItem(rootItems, parentItem.id);
        } else {
          return null;
        }
      }

      return null;
    }

    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        if (hasChildren(item) && item.children.length) {
          return item.children[0];
        } else if (items[i + 1]) {
          return items[i + 1];
        } else {
          return findParentsBrotherItem(ctx.rootItems, id);
        }
      }

      if (hasChildren(item)) {
        const result: IItem | null = traverse.findDownerItem(item.children, id, ctx);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  },
  findDownerItemSkipNoTextItem: (items: IItem[], id: string): IItem | null => {
    const item: IItem | null = traverse.findDownerItem(items, id);
    if (item !== null && item.style === 'DIVIDER') {
      return traverse.findDownerItemSkipNoTextItem(items, item.id);
    }

    return item;
  },
  addItem: (items: IItem[], prevId: string, newId?: string): IItem | null => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === prevId) {
        const prevItem: IItem | null = traverse.findItem(items, prevId);
        const newItem: IItem = {
          id: newId || uuid(),
          style: 'TEXT',
          text: '',
          children: [],
        };
        if (prevItem) {
          traverse.turnInto(newItem, prevItem.style);
        }
        if (prevItem !== null && hasChildren(prevItem)) {
          newItem.children = prevItem.children;
          prevItem.children = [];
        }

        items.splice(i + 1, 0, newItem);

        return newItem;
      } else {
        if (hasChildren(item)) {
          const result: IItem | null = traverse.addItem(item.children, prevId, newId);
          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  },
  shiftItem(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        const prevItem: IItem | null = items[i - 1] || null;
        if (prevItem) {
          if (hasChildren(prevItem)) {
            items.splice(i, 1);
            prevItem.children.push(item);

            return;
          }
        }
      } else {
        if (hasChildren(item)) {
          traverse.shiftItem(item.children, id);
        }
      }
    }
  },
  unshiftItem(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (hasChildren(item)) {
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            item.children.splice(j, 1);
            items.splice(i + 1, 0, childItem);

            return;
          }
        }
        traverse.unshiftItem(item.children, id);
      }
    }
  },
  deleteItem(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        items.splice(i, 1);

        return;
      } else {
        if (hasChildren(item)) {
          traverse.deleteItem(item.children, id);
        }
      }
    }
  },
  cancelItem(items: IItem[], id: string, context?: { depth: number }): void {
    // TEXTじゃない場合
    //  TEXTに変換
    // 親がいない
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいる
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいない
    //  unshiftItem

    const ctx: { depth: number } = context ? context : { depth: 0 };
    const hasParent: boolean = ctx.depth !== 0;

    for (const item of items) {
      if (item.style !== 'TEXT' && item.id === id) {
        traverse.turnInto(item, 'TEXT');

        return;
      }

      if (!hasParent && item.id === id) {
        if (hasChildren(item)) {
          for (let j: number = item.children.length - 1; j >= 0; j -= 1) {
            traverse.unshiftItem(items, item.children[j].id);
          }
        }
        traverse.deleteItem(items, id);

        return;
      }

      if (hasChildren(item)) {
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            const hasPreItem: boolean = !!item.children[j - 1];
            const hasSufItem: boolean = !!item.children[j + 1];

            if (childItem.style !== 'TEXT') {
              traverse.turnInto(childItem, 'TEXT');

              return;
            } else if (hasPreItem && hasSufItem) {
              if (hasChildren(childItem)) {
                for (let k: number = childItem.children.length - 1; k >= 0; k -= 1) {
                  traverse.unshiftItem(items, childItem.children[k].id);
                }
              }
              traverse.deleteItem(items, id);

              return;
            } else {
              traverse.unshiftItem(items, id);

              return;
            }
          }
        }
      }

      if (hasChildren(item)) {
        traverse.cancelItem(item.children, id, { depth: ctx.depth + 1 });
      }
    }
  },
  prependItem: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 一つ前のアイテムに子がいればこの末尾に
    // 子がいなければ前に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.findItem(items, id);
    if (item) {
      ctx.item = item;
      traverse.deleteItem(items, id);
    }

    if (ctx.item) {
      for (let i: number = 0; i < items.length; i += 1) {
        const targetItem: IItem = items[i];
        const prevItem: IItem | null = items[i - 1] || null;
        if (targetItem.id === toId) {
          if (prevItem && hasChildren(prevItem) && prevItem.children.length > 0) {
            prevItem.children.push(ctx.item);
          } else {
            items.splice(i, 0, ctx.item);
          }

          return;
        } else {
          if (hasChildren(targetItem)) {
            traverse.prependItem(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
  appendItem: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 子がいれば子の先頭に
    // 子がいなければ次に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.findItem(items, id);
    if (item) {
      ctx.item = item;
      traverse.deleteItem(items, id);
    }

    if (ctx.item) {
      for (let i: number = 0; i < items.length; i += 1) {
        const targetItem: IItem = items[i];
        if (targetItem.id === toId) {
          if (targetItem !== null && hasChildren(targetItem) && targetItem.children.length > 0) {
            targetItem.children.unshift(ctx.item);
          } else {
            items.splice(i + 1, 0, ctx.item);
          }

          return;
        } else {
          if (hasChildren(targetItem)) {
            traverse.appendItem(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
  turnInto: (item: IItem, style: string): void => {
    if (item.style !== style) {
      switch (style) {
        case 'TEXT': {
          Object.assign(item, {
            style: 'TEXT',
            text: hasText(item) ? item.text : '',
            children: hasChildren(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
          break;
        }
        case 'BULLETED': {
          Object.assign(item, {
            style: 'BULLETED',
            text: hasText(item) ? item.text : '',
            children: hasChildren(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
          break;
        }
        case 'NUMBERED': {
          Object.assign(item, {
            style: 'NUMBERED',
            text: hasText(item) ? item.text : '',
            children: hasChildren(item) ? item.children : [],
            completed: undefined,
            opened: undefined,
          });
          break;
        }
        case 'TASK': {
          Object.assign(item, {
            style: 'TASK',
            text: hasText(item) ? item.text : '',
            children: hasChildren(item) ? item.children : [],
            completed: false,
            opened: undefined,
          });
          break;
        }
        case 'TOGGLE': {
          Object.assign(item, {
            style: 'TOGGLE',
            text: hasText(item) ? item.text : '',
            children: hasChildren(item) ? item.children : [],
            completed: undefined,
            opened: false,
          });
          break;
        }
        case 'HEADER': {
          Object.assign(item, {
            style: 'HEADER',
            text: hasText(item) ? item.text : '',
            children: undefined,
            completed: undefined,
            opened: undefined,
          });
          break;
        }
        case 'DIVIDER': {
          Object.assign(item, {
            style: 'DIVIDER',
            text: undefined,
            children: undefined,
            completed: undefined,
            opened: undefined,
          });
          break;
        }
        default:
      }
    }
  },
};
