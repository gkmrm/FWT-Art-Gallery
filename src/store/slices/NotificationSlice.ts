import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { apiGallery } from '@store/api';
import { artistApi } from '@store/services/ArtistsService';
import { authApi } from '@store/services/AuthService';
import { genreApi } from '@store/services/GenresService';

export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

interface INotificationSliceState {
  message: string | null;
}

const initialState: INotificationSliceState = {
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    deleteNotification(store) {
      // eslint-disable-next-line no-param-reassign
      store.message = null;
    },
  },
  extraReducers: (builder) => {
    const endpoints = {
      ...artistApi.endpoints,
      ...genreApi.endpoints,
      ...authApi.endpoints,
    };
    const matchRejectedEndpoints = Object.keys(apiGallery.endpoints).map(
      (key) => endpoints[key as keyof typeof endpoints].matchRejected
    );

    builder.addMatcher(
      isAnyOf(...matchRejectedEndpoints),
      (state, { payload }) => {
        // eslint-disable-next-line no-param-reassign
        state.message = (payload as IErrorResponse).message;
      }
    );
  },
});

export const { reducer: notificationReducer, actions: notificationActions } =
  notificationSlice;
