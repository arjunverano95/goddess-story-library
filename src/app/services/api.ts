import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

axios.defaults.baseURL = 'https://arjunverano95.github.io';

const responseBody = (response: AxiosResponse) => response.data;

export const api = {
  get: (url: string, config?: AxiosRequestConfig) =>
    axios.get(url, config).then(responseBody),
  post: (url: string, body: unknown) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: unknown) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then(responseBody);
  },
};
