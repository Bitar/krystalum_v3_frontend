import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers';
import {User} from '../../../../models/iam/User';
import {Publication} from '../../../../models/supply/publication/Publication';
import {AuthModel} from '../../../../modules/auth';
import * as authHelper from '../../../../modules/auth/core/AuthHelpers';

interface Props {
    publication: Publication | null;
    setPublication: Dispatch<SetStateAction<Publication | null>>;
    refresh: boolean | null;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
    handleRefresh: () => void
}

const defaultPublicationContext = {
    publication: null,
    setPublication: () => {},
    refresh: null,
    setRefresh: () => {},
    handleRefresh: () => {},
}

export const PublicationContext = createContext<Props>(defaultPublicationContext)

export const usePublication = () => {
    return useContext(PublicationContext)
}