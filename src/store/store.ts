import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { artistsStaticApi } from './services/ArtistsStaticService';

const rootReducer = combineReducers({
  [artistsStaticApi.reducerPath]: artistsStaticApi.reducer,
});

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artistsStaticApi.middleware),
});

export const setupStore = () => rootStore;

setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
