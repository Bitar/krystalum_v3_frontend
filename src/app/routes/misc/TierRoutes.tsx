import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import TierIndex from '../../sections/misc/tiers/pages/Index';
import TierCreate from '../../sections/misc/tiers/pages/Create';
import TierEdit from '../../sections/misc/tiers/pages/Edit';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_TIERS,
        path: '/misc/tiers/',
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

const TierRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_TIERS}</PageTitle>
                    <TierIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <TierCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <TierEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default TierRoutes;
