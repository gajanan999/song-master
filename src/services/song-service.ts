import api from "./axios.config";

interface ResponseHandler {
  (data: any): void;
}

interface ErrorHandler {
  (error: Error, message: string): void;
}

export const SongService = {


  getAllSongsCount: async({
    handleResponse,
    handleError,
  }: {
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.get(`/songs/count`);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  
  getAllSongsCountByUserId: async({
    userId,
    handleResponse,
    handleError,
  }: {
    userId: string;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.get(`/songs/count?userId=${userId}`);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  getAllSongsByUserId: async ({
    userId,
    releaseYear,
    artistName,
    sortBy,
    sortByColumns,
    handleResponse,
    handleError,
  }: {
    userId: string;
    releaseYear?: string;
    artistName?: string;
    sortBy?: string;
    sortByColumns?: string;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {

    try {
      let url = `songs?userId=${userId}`;

      // Append other query parameters if they are provided
      if (releaseYear) {
        url += `&releaseYear=${releaseYear}`;
      }
      if (artistName) {
        url += `&artistName=${artistName}`;
      }
      if (sortBy) {
        url += `&sortBy=${sortBy}`;
      }

      if (sortByColumns) {
        url += `&sortByColumns=${sortByColumns}`;
      }

      const response = await api.get(url);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
    
  },

  getAllSongs: async ({
    handleResponse,
    handleError,
  }: {
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.get(`songs`);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  addOrUpdateSong: async ({
    request,
    handleResponse,
    handleError,
  }: {
    request: Object;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.post(`songs`, request);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  addOrUpdateSongToUserCatalog: async ({
    userId,
    request,
    handleResponse,
    handleError,
  }: {
    userId:string,
    request: Object;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.post(`songs/catalogs?userId=${userId}`, request);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  deleteSong: async ({
    songId,
    handleResponse,
    handleError,
  }: {
    songId: string;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.delete(`songs/${songId}`);
      handleResponse(response);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },

  deleteSongFromUserCatelog: async ({
    userId,
    songId,
    handleResponse,
    handleError,
  }: {
    userId: string;
    songId: string;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.delete(`songs/catalogs?userId=${userId}&songId=${songId}`);
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Data fetch Failed");
    }
  },
};
