import {Advertiser} from '../../../../models/demand/Advertiser';
import {createContext, Dispatch, SetStateAction, useContext} from 'react';

interface Props {
    advertiser: Advertiser | null;
    setAdvertiser: Dispatch<SetStateAction<Advertiser | null>>;
}

const defaultAdvertiserContext = {
    advertiser: null,
    setAdvertiser: () => {
    }
}

export const AdvertiserContext = createContext<Props>(defaultAdvertiserContext);

export const useAdvertiser = () => {
    return useContext(AdvertiserContext);
}