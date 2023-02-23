import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import BuyingModelIndex from '../../sections/misc/buying-models/pages/Index';
import BuyingModelCreate from '../../sections/misc/buying-models/pages/Create';
import BuyingModelEdit from '../../sections/misc/buying-models/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_BUYING_MODELS,
        path: '/misc/buying-models/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const BuyingModelRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_BUYING_MODELS}</PageTitle>
                    <BuyingModelIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <BuyingModelCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <BuyingModelEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default BuyingModelRoutes;
