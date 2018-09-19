import { IBulletedItem, IItem, INumberedItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';

/*
 * find
 * addItem
 * shiftItem
 * shiftGroup
 * unshiftItem
 * unshiftGroup
 * deleteItem
 * deleteGroup
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
  shiftGroup(items: IItem[], id: string): void;
  unshiftItem(items: IItem[], id: string): void;
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

            if (hasChildren(item)) {
              prevItem.children = prevItem.children.concat(item.children);
              item.children = [];
            }
          }
        }
      } else {
        if (hasChildren(item)) {
          traverse.shiftItem(item.children, id);
        }
      }
    }
  },
  shiftGroup(items: IItem[], id: string): void {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === id) {
        const prevItem: IItem | null = items[i - 1] || null;
        if (prevItem && hasChildren(prevItem)) {
          items.splice(i, 1);
          prevItem.children.push(item);
        }
      } else {
        if (hasChildren(item)) {
          traverse.shiftGroup(item.children, id);
        }
      }
    }
  },
  unshiftItem(items: IItem[], id: string): void {
    // 親の時点で子を調べて、あったら
    // - 親のすぐ後ろに子を追加
    // - 次のアイテムは子の子に
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (hasChildren(item)) {
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            if (item.children[j + 1] && hasChildren(childItem)) {
              childItem.children.push(item.children[j + 1]);
            }

            item.children.splice(j, 1);
            items.splice(i + 1, 0, childItem);
          }
        }
        traverse.unshiftItem(item.children, id);
      }
    }
  },
};
