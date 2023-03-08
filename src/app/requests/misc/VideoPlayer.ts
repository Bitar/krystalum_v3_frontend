import axios, {AxiosError, AxiosResponse} from 'axios'

import {createFormData, ExportUrl} from '../../helpers/requests';
import {VideoPlayer, VideoPlayerList, VideoPlayerPaginate} from '../../models/misc/VideoPlayer';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/video-players`

export const getAllVideoPlayers = async (): Promise<VideoPlayerList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<VideoPlayerList>) => response.data).catch((error) => {
        return error;
    });
}

export const exportVideoPlayers = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getVideoPlayers = (query?: String): Promise<VideoPlayerPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<VideoPlayerPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const getVideoPlayer = async (id: number): Promise<VideoPlayer | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeVideoPlayer = async (videoPlayer: any): Promise<VideoPlayer | AxiosError | undefined> => {
    let formData = createFormData(videoPlayer);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateVideoPlayer = async (videoPlayer: any): Promise<VideoPlayer | AxiosError | undefined> => {
    let formData = createFormData(videoPlayer);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + videoPlayer.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
