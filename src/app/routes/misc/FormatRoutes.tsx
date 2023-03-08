import {Route, Routes} from 'react-router-dom';
import React from 'react';

import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {Sections} from '../../helpers/sections';
import FormatIndex from '../../sections/misc/formats/pages/Index';
import FormatCreate from '../../sections/misc/formats/pages/Create';
import FormatEdit from '../../sections/misc/formats/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_FORMATS,
        path: '/misc/formats/',
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

const FormatRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_FORMATS}</PageTitle>
                    <FormatIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <FormatCreate />
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <FormatEdit />
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default FormatRoutes;
