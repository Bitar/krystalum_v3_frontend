import {Route, Routes} from 'react-router-dom'
import React from 'react'

import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import BusinessUnitIndex from '../../sections/misc/business_units/pages/Index';
import BusinessUnitCreate from '../../sections/misc/business_units/pages/Create';
import BusinessUnitEdit from '../../sections/misc/business_units/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_BUSINESS_UNITS,
        path: '/misc/business-units/',
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

const BusinessUnitRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_BUSINESS_UNITS}</PageTitle>
                    <BusinessUnitIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <BusinessUnitCreate />
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <BusinessUnitEdit />
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default BusinessUnitRoutes;
