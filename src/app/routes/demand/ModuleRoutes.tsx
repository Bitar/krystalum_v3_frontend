import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';
import CampaignRoutes from './CampaignRoutes';

const DemandModuleRoutes: React.FC = () => {
    const TradingDeskRoutes = lazy(() => import('./TradingDeskRoutes'));
    const HoldingGroupRoutes = lazy(() => import('./HoldingGroupRoutes'));
    const AgencyRoutes = lazy(() => import('./AgencyRoutes'));
    const AdvertiserRoutes = lazy(() => import('./AdvertiserRoutes'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='trading-desks/*'
                element={
                    <SuspenseView>
                        <TradingDeskRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='holding-groups/*'
                element={
                    <SuspenseView>
                        <HoldingGroupRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='agencies/*'
                element={
                    <SuspenseView>
                        <AgencyRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='advertisers/*'
                element={
                    <SuspenseView>
                        <AdvertiserRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='campaigns/*'
                element={
                    <SuspenseView>
                        <CampaignRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default DemandModuleRoutes;