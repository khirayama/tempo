import { IItem } from 'state/state';

export const traverse: {
  find(items: IItem[], id: string): IItem | null;
} = {
  find: (items: IItem[], id: string): IItem | null => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      } else {
        if (
          item.style === 'TEXT' ||
          item.style === 'BULLETED' ||
          item.style === 'NUMBERED' ||
          item.style === 'TASK' ||
          item.style === 'TOGGLE'
        ) {
          const result: IItem | null = traverse.find(item.children, id);
          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  },
};
