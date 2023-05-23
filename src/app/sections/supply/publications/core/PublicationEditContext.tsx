import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers';
import {Publication} from '../../../../models/supply/publication/Publication';

interface Props {
    publication: Publication | null;
    setPublication: Dispatch<SetStateAction<Publication | null>>;
    refresh: boolean | null;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    handleRefresh: () => void,
}

const defaultPublicationEditContext = {
    publication: null,
    setPublication: () => {
    },
    refresh: false,
    setRefresh: () => {
    },
    handleRefresh: () => {
    }
}

export const PublicationEditContext = createContext<Props>(defaultPublicationEditContext)

export const usePublicationEdit = () => {
    return useContext(PublicationEditContext)
}

export const PublicationEditProvider: FC<WithChildren> = ({children}) => {
    const [publication, setPublication] = useState<Publication | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    return (
        <PublicationEditContext.Provider value={{
            publication, setPublication,
            refresh, setRefresh,
            handleRefresh
        }}>
            {children}
        </PublicationEditContext.Provider>
    )
}