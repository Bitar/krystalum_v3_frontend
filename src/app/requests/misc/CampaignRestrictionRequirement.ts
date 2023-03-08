import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData, ExportUrl} from '../../helpers/requests';

import {
    CampaignRestrictionRequirement,
    CampaignRestrictionRequirementList,
    CampaignRestrictionRequirementPaginate
} from '../../models/misc/CampaignRestrictionRequirement';

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/misc/campaign-restriction-requirements`

export const getAllCampaignRestrictionRequirements = async (): Promise<CampaignRestrictionRequirementList | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CampaignRestrictionRequirementList>) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignRestrictionRequirements = (query?: String): Promise<CampaignRestrictionRequirementPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse<CampaignRestrictionRequirementPaginate>) => response.data).catch((error) => {
        return error;
    });
}

export const exportCampaignRestrictionRequirements = async (query?: String): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${ENDPOINT}/export`;

    if (query) {
        url += `?${query}`;
    }

    return axios.get(url).then((response: AxiosResponse) => response.data).catch((error) => {
        return error;
    });
}

export const getCampaignRestrictionRequirement = async (id: number): Promise<CampaignRestrictionRequirement | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCampaignRestrictionRequirement = async (campaignRestrictionRequirement: any): Promise<CampaignRestrictionRequirement | AxiosError | undefined> => {
    let formData = createFormData(campaignRestrictionRequirement);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const updateCampaignRestrictionRequirement = async (campaignRestrictionRequirement: any): Promise<CampaignRestrictionRequirement | AxiosError | undefined> => {
    let formData = createFormData(campaignRestrictionRequirement);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + campaignRestrictionRequirement.id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
