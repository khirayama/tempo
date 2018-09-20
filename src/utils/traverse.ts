import { IBulletedItem, IItem, INumberedItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';

/*
 * find
 * addItem
 * shiftItem
 * unshiftItem
 * deleteItem
 * cancelItem
 * sortItem
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
  cancelItem(items: IItem[], id: string, depth: number): void;
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
  cancelItem(items: IItem[], id: string, depth: number): void {
    // 親がいない
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいる
    //  childrenをunshiftしてdeleteItem
    // 親がいる & 兄がいる & 弟がいない
    //  unshiftItem

    const hasParent: boolean = depth !== 0;

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
        traverse.cancelItem(item.children, id, depth + 1);
      }
    }
  },
};
