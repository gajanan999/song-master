import api from "./axios.config";


interface ResponseHandler {
  (data: any): void;
}

interface ErrorHandler {
  (error: Error, message: string): void;
}


export const AuthService = {
  login: async ({
    mobileNumber,
    password,
    handleResponse,
    handleError,
  }: {
    mobileNumber: string;
    password: string;
    handleResponse: ResponseHandler;
    handleError: ErrorHandler;
  }) => {
    try {
      const response = await api.post(`login`, { mobileNumber, password });
      handleResponse(response.data);
    } catch (error: any) {
      handleError(error, "Login Failed");
    }
  },
};
