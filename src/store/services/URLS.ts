const URLS_AUTH = {
  register: '/auth/register',
  login: '/auth/login',
  refresh: '/auth/refresh',
};

const URLS_ARTIST = {
  artistsStatic: '/artists/static',
  artists: '/artists',
  createArtist: '/artists',
  artistByIdStatic: (id: string) => `/artists/static/${id}`,
  artistById: (id: string) => `/artists/${id}`,
  editArtist: (id: string) => `/artists/${id}`,
  deleteArtist: (id: string) => `/artists/${id}`,
  updateMainPainting: (id: string) => `/artists/${id}/main-painting`,
  addPaint: (id: string) => `/artists/${id}/paintings`,
  editPaint: (id: string, paintId: string) =>
    `/artists/${id}/paintings/${paintId}`,
  deletePaint: (id: string, paintId: string) =>
    `/artists/${id}/paintings/${paintId}`,
};

const URLS_GENRES = {
  genres: '/genres',
};

export { URLS_AUTH, URLS_ARTIST, URLS_GENRES };
