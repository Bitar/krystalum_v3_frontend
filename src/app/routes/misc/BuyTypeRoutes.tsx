import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import BuyTypeCreate from '../../sections/misc/buy-types/pages/Create';
import BuyTypeIndex from '../../sections/misc/buy-types/pages/Index';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_BUY_TYPES,
        path: '/misc/buy-types/',
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

const BuyTypeRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_BUY_TYPES}</PageTitle>
                    <BuyTypeIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <BuyTypeCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        {/*<RoleEdit />*/}
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default BuyTypeRoutes;
