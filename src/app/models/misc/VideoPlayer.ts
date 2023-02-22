import {ID, Response} from '../../../_metronic/helpers';

export type VideoPlayer = {
    id: ID,
    name: string
};

export type VideoPlayerPaginate = Response<VideoPlayer[]>;

export type VideoPlayerList = {
    data: VideoPlayer[]
}

export const defaultVideoPlayer: VideoPlayer = {id: 0, name: ""};