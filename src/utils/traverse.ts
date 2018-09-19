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
};
