import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from 'react-native-config';

export const axiosInstance = axios.create({baseURL: Config.API_URL});

export const apiRequest = async (
  url: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  return axiosInstance({
    ...options,
    url: `${url}&appid=${Config.API_KEY}&units=metric`,
  });
};
