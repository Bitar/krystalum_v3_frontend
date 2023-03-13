import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import TradingDeskIndex from '../../sections/demand/trading-desks/pages/Index';
import TradingDeskCreate from '../../sections/demand/trading-desks/pages/Create';
import TradingDeskEdit from '../../sections/demand/trading-desks/pages/Edit';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.DEMAND_TRADING_DESKS,
        path: '/demand/trading-desks/',
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

const TradingDeskRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.DEMAND_TRADING_DESKS}</PageTitle>
                    <TradingDeskIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <TradingDeskCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <TradingDeskEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default TradingDeskRoutes;
