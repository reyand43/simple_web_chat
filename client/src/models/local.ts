import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { IUser } from '../types/user';

const initialState: IUser = {
  name: '',
  id: '',
};

export const localData = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setLocalReducer(state: any, payload: IUser) {
      return payload;
    },
  },
})
