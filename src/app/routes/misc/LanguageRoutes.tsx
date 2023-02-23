import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import LanguageIndex from '../../sections/misc/languages/pages/Index';
import LanguageCreate from '../../sections/misc/languages/pages/Create';
import LanguageEdit from '../../sections/misc/languages/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_LANGUAGES,
        path: '/misc/languages/',
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

const LanguageRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_LANGUAGES}</PageTitle>
                    <LanguageIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <LanguageCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <LanguageEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default LanguageRoutes;
