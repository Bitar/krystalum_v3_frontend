import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const MiscModuleRoutes: React.FC = () => {
    const TechnologyRoutes = lazy(() => import('./TechnologyRoutes'));
    const AdServerRoutes = lazy(() => import('./AdServerRoutes'));
    const AdvertiserIndustryRoutes = lazy(() => import('./AdvertiserIndustryRoutes'));
    const BusinessUnitRoutes = lazy(() => import('./BusinessUnitRoutes'));
    const KpiRoutes = lazy(() => import('./KpiRoutes'));
    const ObjectiveRoutes = lazy(() => import('./ObjectiveRoutes'));
    const PerformanceMetricRoutes = lazy(() => import('./PerformanceMetricRoutes'));
    const VerticalRoutes = lazy(() => import('./VerticalRoutes'));
    const VideoPlayerRoutes = lazy(() => import('./VideoPlayerRoutes'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='technologies/*'
                element={
                    <SuspenseView>
                        <TechnologyRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='ad-servers/*'
                element={
                    <SuspenseView>
                        <AdServerRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='advertiser-industries/*'
                element={
                    <SuspenseView>
                        <AdvertiserIndustryRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='business-units/*'
                element={
                    <SuspenseView>
                        <BusinessUnitRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='kpis/*'
                element={
                    <SuspenseView>
                        <KpiRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='objectives/*'
                element={
                    <SuspenseView>
                        <ObjectiveRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='performance-metrics/*'
                element={
                    <SuspenseView>
                        <PerformanceMetricRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='verticals/*'
                element={
                    <SuspenseView>
                        <VerticalRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='video-players/*'
                element={
                    <SuspenseView>
                        <VideoPlayerRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default MiscModuleRoutes;