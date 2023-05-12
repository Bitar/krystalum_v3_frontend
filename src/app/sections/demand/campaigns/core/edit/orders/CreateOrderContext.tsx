// This form will be used to pass data between the order form, the modal that contains the new/edit/copy format form,
// and the format form itself

import {CampaignOrderFormFields, defaultCampaignOrderFormFields} from './form';
import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {CampaignOrderFormatFormFields, defaultCampaignOrderFormatFormFields} from './formats/form';

interface Props {
    orderForm: CampaignOrderFormFields;
    setOrderForm: Dispatch<SetStateAction<any>>,
    formatForm: CampaignOrderFormatFormFields,
    setFormatForm: Dispatch<SetStateAction<any>>
}

const defaultCreateOrderContext = {
    orderForm: defaultCampaignOrderFormFields,
    setOrderForm: () => {
    },
    formatForm: defaultCampaignOrderFormatFormFields,
    setFormatForm: () => {
    }
}

export const CreateOrderContext = createContext<Props>(defaultCreateOrderContext);

export const useCreateOrder = () => {
    return useContext(CreateOrderContext);
}