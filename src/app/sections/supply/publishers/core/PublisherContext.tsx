import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {Publisher} from '../../../../models/supply/publisher/Publisher';

interface Props {
    publisher: Publisher | null;
    setPublisher: Dispatch<SetStateAction<Publisher | null>>;
    refetchOptions: boolean;
    setRefetchOptions: Dispatch<SetStateAction<boolean>>;
}

const defaultPublisherContext = {
    publisher: null,
    setPublisher: () => {
    },
    refetchOptions: false,
    setRefetchOptions: () => {
    }
}

export const PublisherContext = createContext<Props>(defaultPublisherContext)

export const usePublisher = () => {
    return useContext(PublisherContext)
}