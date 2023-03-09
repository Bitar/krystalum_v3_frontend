import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import GenderIndex from '../../sections/misc/genders/pages/Index';
import GenderCreate from '../../sections/misc/genders/pages/Create';
import GenderEdit from '../../sections/misc/genders/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_GENDERS,
        path: '/misc/genders/',
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

const GenderRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_GENDERS}</PageTitle>
                    <GenderIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <GenderCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <GenderEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default GenderRoutes;
