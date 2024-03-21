import api from "./axios.config";

interface ResponseHandler {
  (data: any): void;
}

interface ErrorHandler {
  (error: Error, message: string): void;
}



export const UserService = {


    registerUser: async({
        request,
        handleResponse,
        handleError,
      }: {
        request:object,
        handleResponse: ResponseHandler;
        handleError: ErrorHandler;
      }) => {
        try {
          const response = await api.post(`/users`, request);
          handleResponse(response.data);
        } catch (error: any) {
          handleError(error, "Data fetch Failed");
        }
      },

}