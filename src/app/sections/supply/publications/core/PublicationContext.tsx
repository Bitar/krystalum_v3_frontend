import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {Publication} from '../../../../models/supply/publication/Publication';

interface Props {
    publication: Publication | null;
    setPublication: Dispatch<SetStateAction<Publication | null>>;
}

const defaultPublicationContext = {
    publication: null,
    setPublication: () => {
    },
}

export const PublicationContext = createContext<Props>(defaultPublicationContext)

export const usePublication = () => {
    return useContext(PublicationContext)
}