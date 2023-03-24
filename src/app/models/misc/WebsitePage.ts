import {Response} from '../../../_metronic/helpers';

export type WebsitePage = {
    id: number,
    name: string
};

export type WebsitePagePaginate = Response<WebsitePage[]>;

export type WebsitePageList = {
    data: WebsitePage[]
}