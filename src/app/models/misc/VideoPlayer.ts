import {Response} from '../../../_metronic/helpers';

export type VideoPlayer = {
    id: number,
    name: string
};

export type VideoPlayerPaginate = Response<VideoPlayer[]>;

export type VideoPlayerList = {
    data: VideoPlayer[]
}

export const defaultVideoPlayer: VideoPlayer = {id: 0, name: ""};