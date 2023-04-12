import * as Yup from 'yup';

export interface CampaignOwnershipFormFields {
    is_owner_demand: number,
    owner_id: number | string
}

export const defaultCampaignOwnershipFormFields = {
    is_owner_demand: 1,
    owner_id: ''
};

export const getCampaignOwnershipSchema = () => {
    return Yup.object().shape({
        is_owner_demand: Yup.number().required(),
        owner_id: Yup.number().required()
    });
}