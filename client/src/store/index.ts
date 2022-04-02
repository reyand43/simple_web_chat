import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel, models } from '../models';
import { ExtraModelsFromUpdated } from '@rematch/updated'

type FullModel = ExtraModelsFromUpdated<RootModel>
export const store = init({
  models,
  redux: {
    rootReducers: {
      resetStore: () => undefined
    },
  }
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>
export const dispatchResetStore = () => store.dispatch({ type: 'resetStore' });
