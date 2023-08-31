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
  deleteArtist: (authorId: string) => `/artists/${authorId}`,
  updateMainPainting: (authorId: string) =>
    `/artists/${authorId}/main-painting`,
  addPaint: (authorId: string) => `/artists/${authorId}/paintings`,
  editPaint: (authorId: string, paintId: string) =>
    `/artists/${authorId}/paintings/${paintId}`,
  deletePaint: (authorId: string, paintId: string) =>
    `/artists/${authorId}/paintings/${paintId}`,
};

const URLS_GENRES = {
  genres: '/genres/static',
};

export { URLS_AUTH, URLS_ARTIST, URLS_GENRES };
