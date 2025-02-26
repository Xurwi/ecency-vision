import { DeckState, UpdateIntervalAction } from '../types';
import { Dispatch } from 'redux';
import { updateIntervalAct } from '../acts';
import { set } from '../../../util/local-storage';
import { serializeDecks } from '../helpers';

export const setDeckUpdateInterval = (data: UpdateIntervalAction['data'], username: string) => (dispatch: Dispatch, getState: () => { deck: DeckState }) => {
  dispatch(updateIntervalAct(data));

  const { items } = getState().deck;
  set(`user-${username}-decks`, serializeDecks(items));
}