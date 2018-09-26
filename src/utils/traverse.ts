import { IBulletedItem, IItem, INumberedItem, ITaskItem, ITextItem, IToggleItem } from 'state/state';

/*
 * findItem
 * findParentItem
 * findParentBrotherItem
 * findUpperItem
 * findDownerItem
 * addItem
 * shiftItem
 * unshiftItem
 * deleteItem
 * cancelItem
 * prependItem
 * appendItem
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

function findLastChild(item: IItem): IItem | null {
  if (hasChildren(item) && item.children.length) {
    const lastChild: IItem = item.children[item.children.length - 1];
    if (hasChildren(lastChild) && lastChild.children.length) {
      return findLastChild(lastChild);
    } else {
      return lastChild;
    }
  }

  return null;
}

export const traverse: {
  findItem(items: IItem[], id: string): IItem | null;
  findParentItem(items: IItem[], id: string): IItem | null;
  findParentBrotherItem(items: IItem[], id: string): IItem | null;
  findUpperItem(items: IItem[], id: string): IItem | null;
  findDownerItem(items: IItem[], id: string, context?: { rootItems: IItem[] }): IItem | null;
  addItem(items: IItem[], prevId: string, newId?: string): void;
  shiftItem(items: IItem[], id: string): void;
  unshiftItem(items: IItem[], id: string): void;
  deleteItem(items: IItem[], id: string): void;
  cancelItem(items: IItem[], id: string, context?: { depth: number }): void;
  prependItem(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
  appendItem(items: IItem[], id: string, toId: string, context?: { item: IItem | null }): void;
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
    // TODO: textがないItemの場合、飛ばす
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];

      if (item.id === id) {
        const prevItem: IItem | null = items[i - 1] || null;

        if (prevItem === null || !hasChildren(prevItem)) {
          return null;
        } else if (hasChildren(prevItem) && !prevItem.children.length) {
          return prevItem;
        }

        const result: IItem | null = findLastChild(prevItem);
        if (result !== null) {
          return result;
        }
      } else if (hasChildren(item)) {
        // 次に行く前に子供のチェック
        for (let j: number = 0; j < item.children.length; j += 1) {
          const childItem: IItem = item.children[j];

          if (childItem.id === id) {
            if (j === 0) {
              return item;
            } else {
              const prevItem: IItem = item.children[j - 1];

              if (!hasChildren(prevItem)) {
                return null;
              } else if (hasChildren(prevItem) && !prevItem.children.length) {
                return prevItem;
              }

              const result: IItem | null = findLastChild(prevItem);
              if (result !== null) {
                return result;
              }
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
  findDownerItem: (items: IItem[], id: string, context?: { rootItems: IItem[] }): IItem | null => {
    const ctx: { rootItems: IItem[] } = context ? context : { rootItems: items };

    // TODO: textがないItemの場合、飛ばす
    // 自分に子がいれば、一番上の子
    // 子がいなければ、弟
    // 子も弟もいなければ、親の弟
    // 親の弟もいなければ、親の親の弟(親なしまで繰り返す)
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
  addItem: (items: IItem[], prevId: string, newId?: string): void => {
    for (let i: number = 0; i < items.length; i += 1) {
      const item: IItem = items[i];
      if (item.id === prevId) {
        const prevItem: IItem | null = traverse.findItem(items, prevId);
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
    // TODO: typeがTEXTじゃない場合はtextに変更

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
};
