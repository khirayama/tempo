import { IBulletedItem, IItem, INumberedItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';

/*
 * find
 * addItem
 * shiftItem
 * unshiftItem
 * deleteItem
 * cancelItem
 * befor
 * after
 * turnInto
*/

function hasChildren(item: IItem): item is ITextItem | IBulletedItem | INumberedItem | ITaskItem | IToggleItem {
  return (
    item.style === 'TEXT' ||
    item.style === 'BULLETED' ||
    item.style === 'NUMBERED' ||
    item.style === 'TASK' ||
    item.style === 'TOGGLE'
  );
}

export const traverse: {
  find(items: IItem[], id: string): IItem | null;
  addItem(items: IItem[], prevId: string, newId?: string): void;
  shiftItem(items: IItem[], id: string): void;
  unshiftItem(items: IItem[], id: string): void;
  deleteItem(items: IItem[], id: string): void;
  cancelItem(items: IItem[], id: string, context?: { depth: number }): void;
  before(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
  after(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
} = {
  find: (items: IItem[], id: string): IItem | null => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      } else {
        if (hasChildren(item)) {
          const result: IItem | null = traverse.find(item.children, id);
          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  },
  addItem: (items: IItem[], prevId: string, newId?: string): void => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === prevId) {
        const prevItem: IItem | null = traverse.find(items, prevId);
        const newItem: ITextItem = {
          id: newId || '', // Add id
          style: 'TEXT',
          text: '',
          children: [],
        };
        if (prevItem !== null && hasChildren(prevItem)) {
          newItem.children = prevItem.children;
          prevItem.children = [];
        }

        items.splice(i + 1, 0, newItem);

        return;
      } else {
        if (hasChildren(item)) {
          traverse.addItem(item.children, prevId, newId);
        }
      }
    }
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
    // 親がいない
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいる
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいない
    //  unshiftItem

    const ctx: { depth: number } = context ? context : { depth: 0 };
    const hasParent: boolean = ctx.depth !== 0;

    for (const item of items) {
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

            if (hasPreItem && hasSufItem) {
              if (hasChildren(childItem)) {
                for (let k: number = childItem.children.length - 1; k >= 0; k -= 1) {
                  traverse.unshiftItem(items, childItem.children[k].id);
                }
              }
              traverse.deleteItem(items, id);

              return;
            } else if (hasPreItem && !hasSufItem) {
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
  before: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 一つ前のアイテムに子がいればこの末尾に
    // 子がいなければ前に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.find(items, id);
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
            traverse.before(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
  after: (items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void => {
    // 子がいれば子の先頭に
    // 子がいなければ次に
    const ctx: { item: IItem | null } = context ? context : { item: null };
    const item: IItem | null = traverse.find(items, id);
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
            traverse.after(targetItem.children, id, toId, ctx);
          }
        }
      }
    }
  },
};
