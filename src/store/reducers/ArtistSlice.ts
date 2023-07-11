import { createSlice } from '@reduxjs/toolkit';

import { IArtistStatic } from '@models/ArtistStaticModels';

interface IArtistsState {
  artists: IArtistStatic[];
  isLoading: boolean;
  error: string;
}

const initialState: IArtistsState = {
  artists: [],
  isLoading: false,
  error: '',
};

export const artistsStaticSlice = createSlice({
  name: 'artistsStatic',
  initialState,
  reducers: {},
});

export default artistsStaticSlice.reducer;
