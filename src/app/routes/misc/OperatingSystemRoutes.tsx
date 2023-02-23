import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import OperatingSystemIndex from '../../sections/misc/operating-systems/pages/Index';
import OperatingSystemCreate from '../../sections/misc/operating-systems/pages/Create';
import OperatingSystemEdit from '../../sections/misc/operating-systems/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_OPERATING_SYSTEMS,
        path: '/misc/operating-systems/',
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

const OperatingSystemRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_OPERATING_SYSTEMS}</PageTitle>
                    <OperatingSystemIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <OperatingSystemCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <OperatingSystemEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default OperatingSystemRoutes;
