import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { IMessage } from '../types/message';

const initialState: IMessage[] = [];

export const messagesData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    addMessageReducer(state: IMessage[], payload: IMessage[]) {
      return [...state, ...payload];
    },
  },
})
