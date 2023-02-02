/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../helpers'

export interface PageLink {
    title: string
    path: string
    isActive: boolean
    isSeparator?: boolean
}

export interface PageDataContextModel {
    pageTitle?: string
    setPageTitle: (_title: string) => void
    pageDescription?: string
    setPageDescription: (_description: string) => void
    pageBreadcrumbs?: Array<PageLink>
    setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
    showPageTitle?: boolean
    setShowPageTitle: React.Dispatch<React.SetStateAction<boolean>>
}

const PageDataContext = createContext<PageDataContextModel>({
    setPageTitle: (_title: string) => {
    },
    setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {
    },
    setPageDescription: (_description: string) => {
    },
    showPageTitle: true,
    setShowPageTitle: () => {}
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
    const [pageTitle, setPageTitle] = useState<string>('');
    const [pageDescription, setPageDescription] = useState<string>('');
    const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([]);
    const [showPageTitle, setShowPageTitle] = useState<boolean>(true);

    const value: PageDataContextModel = {
        pageTitle,
        setPageTitle,
        pageDescription,
        setPageDescription,
        pageBreadcrumbs,
        setPageBreadcrumbs,
        showPageTitle,
        setShowPageTitle
    }
    return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
    return useContext(PageDataContext)
}

type Props = {
    description?: string,
    breadcrumbs?: Array<PageLink>,
    showPageTitle?: boolean
}

const PageTitle: FC<Props & WithChildren> = ({children, description, breadcrumbs, showPageTitle = true}) => {
    const {setPageTitle, setPageDescription, setPageBreadcrumbs, setShowPageTitle} = usePageData()

    useEffect(() => {
        if (children) {
            setPageTitle(children.toString())
        }
        return () => {
            setPageTitle('')
        }
    }, [children])

    useEffect(() => {
        // return () => {
            setShowPageTitle(showPageTitle);
        // }
    }, [showPageTitle])

    useEffect(() => {
        if (description) {
            setPageDescription(description)
        }
        return () => {
            setPageDescription('')
        }
    }, [description])

    useEffect(() => {
        if (breadcrumbs) {
            setPageBreadcrumbs(breadcrumbs)
        }
        return () => {
            setPageBreadcrumbs([])
        }
    }, [breadcrumbs])

    return <></>
}

const PageDescription: FC<WithChildren> = ({children}) => {
    const {setPageDescription} = usePageData()
    useEffect(() => {
        if (children) {
            setPageDescription(children.toString())
        }
        return () => {
            setPageDescription('')
        }
    }, [children])
    return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
