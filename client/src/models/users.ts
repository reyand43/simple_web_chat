import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { IUser } from '../types/user';

const initialState: IUser[] = [];

export const usersData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    addUserReducer(state: IUser[], payload: IUser[]) {
      return [...state, ...payload];
    },
    removeUserReducer(state: IUser[], payload: string) {
      return [...state.filter((s) => s.id !== payload)];
    },
  },
})
