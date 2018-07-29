import { AddAdventurePointsAction } from '../actions/ProfileActions';
import { ActionTypes } from '../constants/ActionTypes';
import * as Data from '../types/data.d';
import { Record } from '../utils/dataUtils';

type Action = AddAdventurePointsAction;

export function adventurePointsReducer(
  state: Record<Data.HeroDependent>,
  action: Action,
): Record<Data.HeroDependent> {
  switch (action.type) {
    case ActionTypes.ADD_ADVENTURE_POINTS:
      return state.modify(
        slice => slice.modify(
          total => total + action.payload.amount,
          'total'
        ),
        'adventurePoints'
      );

    default:
      return state;
  }
}
