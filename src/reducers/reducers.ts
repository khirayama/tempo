// tslint:disable:no-any
import { IAction } from 'action-creators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IPaper, IState } from 'state/state';
import { traverse } from 'utils/traverse';

export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  const paper: IPaper = newState.binders[0].papers[0];
  switch (action.actionType) {
    case actionTypes.FOCUS_ITEM: {
      newState.ui.focusedId = payload.id;
      newState.ui.inputValue = payload.text;
      break;
    }
    //   case actionTypes.FOCUS_UPPER_ITEM: {
    //     const upperItem: IItem | null = traverse.findUpperSkipNoText(paper.items, payload.id);
    //     if (upperItem !== null) {
    //       newState.ui.focusedId = upperItem.id;
    //     }
    //     break;
    //   }
    //   case actionTypes.FOCUS_DOWNER_ITEM: {
    //     const downerItem: IItem | null = traverse.findDownerSkipNoText(paper.items, payload.id);
    //     if (downerItem !== null) {
    //       newState.ui.focusedId = downerItem.id;
    //     }
    //     break;
    //   }
    //   case actionTypes.ADD_BEFORE_ITEM: {
    //     const item: IItem | null = traverse.addBefore(paper.items, payload.prevId, { text: payload.text || '' });
    //     break;
    //   }
    case actionTypes.ADD_ITEM: {
      const prevItem: IItem | null = traverse.find(paper.items, payload.prevId);
      const item: IItem | null = traverse.addAfter(paper.items, payload.prevId, { text: payload.text || '' });
      if (item !== null && prevItem !== null) {
        traverse.turnInto(item, prevItem.style);
        newState.ui.inputValue = '';
        newState.ui.focusedId = item.id;
      }
      break;
    }
    case actionTypes.INDENT_ITEM: {
      traverse.indent(paper.items, payload.id);
      break;
    }
    case actionTypes.UNINDENT_ITEM: {
      traverse.unindent(paper.items, payload.id);
      break;
    }
    //   case actionTypes.DESTROY_ITEM: {
    //     const upperItem: IItem | null = traverse.findUpperSkipNoText(paper.items, payload.id);
    //     if (upperItem) {
    //       newState.ui.focusedId = upperItem.id;
    //     }
    //     traverse.destroy(paper.items, payload.id);
    //     break;
    //   }
    //   case actionTypes.CANCEL_ITEM: {
    //     const upperItem: IItem | null = traverse.findUpper(paper.items, payload.id);
    //     traverse.cancel(paper.items, payload.id);
    //     const item: IItem | null = traverse.find(paper.items, payload.id);
    //     if (item === null && upperItem !== null) {
    //       newState.ui.focusedId = upperItem.id;
    //     }
    //     break;
    //   }
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.id);
      traverse.merge(<IItem>item, payload);
      break;
    }
    default:
  }

  return newState;
}
