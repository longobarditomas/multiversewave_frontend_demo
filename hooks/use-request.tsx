import axios, { AxiosError, Method } from 'axios';

export interface AuthPayload {
    //
}

const csrfRequest = async () => {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    const csrf  = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`);
    return true;
}

const useRequest = async (url: string, method: Method, body?: AuthPayload): Promise<void | any> => {
  try {
    axios.defaults.withCredentials = true;
    await csrfRequest();
    await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`);
    const headers = method.toLowerCase() === 'post' ? { "Content-Type": "multipart/form-data" } : {};
    const data = await axios.request({
      url: url,
      method: method,
      headers: headers,
      data: body,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      console.error("422 Error fetching user data:", axiosError.response.data);
      return axiosError.response.data;
    } else {
      console.error("Error fetching user data:", error);
    }
  }
};

export default useRequest;