import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {Campaign} from '../../../../models/demand/Campaign';

interface Props {
    campaign: Campaign | null;
    setCampaign: Dispatch<SetStateAction<Campaign | null>>;
}

const defaultCampaignContext = {
    campaign: null,
    setCampaign: () => {
    }
}

export const CampaignContext = createContext<Props>(defaultCampaignContext);

export const useCampaign = () => {
    return useContext(CampaignContext);
}