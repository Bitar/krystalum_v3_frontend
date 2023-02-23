import {Route, Routes} from 'react-router-dom';
import React from 'react';

import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {Sections} from '../../helpers/sections';
import PerformanceMetricIndex from '../../sections/misc/performance_metrics/pages/Index';
import PerformanceMetricCreate from '../../sections/misc/performance_metrics/pages/Create';
import PerformanceMetricEdit from '../../sections/misc/performance_metrics/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_PERFORMANCE_METRICS,
        path: '/misc/performance-metrics/',
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

const PerformanceMetricRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_PERFORMANCE_METRICS}</PageTitle>
                    <PerformanceMetricIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <PerformanceMetricCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <PerformanceMetricEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PerformanceMetricRoutes;
