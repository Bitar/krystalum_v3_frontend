import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';
import LanguageRoutes from './LanguageRoutes';

const MiscModuleRoutes: React.FC = () => {
    const TechnologyRoutes = lazy(() => import('./TechnologyRoutes'));
    const BuyTypeRoutes = lazy(() => import('./BuyTypeRoutes'));
    const BookingTypeRoutes = lazy(() => import('./BookingTypeRoutes'));
    const CountryRoutes = lazy(() => import('./CountryRoutes'));
    const CityRoutes = lazy(() => import('./CityRoutes'));
    const BuyingModelRoutes = lazy(() => import('./BuyingModelRoutes'));
    const MetricRoutes = lazy(() => import('./MetricRoutes'));
    const AudienceRoutes = lazy(() => import('./AudienceRoutes'));
    const DeviceRoutes = lazy(() => import('./DeviceRoutes'));
    const OperatingSystemRoutes = lazy(() => import('./OperatingSystemRoutes'));

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
                path='buy-types/*'
                element={
                    <SuspenseView>
                        <BuyTypeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='booking-types/*'
                element={
                    <SuspenseView>
                        <BookingTypeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='countries/*'
                element={
                    <SuspenseView>
                        <CountryRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='cities/*'
                element={
                    <SuspenseView>
                        <CityRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='buying-models/*'
                element={
                    <SuspenseView>
                        <BuyingModelRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='metrics/*'
                element={
                    <SuspenseView>
                        <MetricRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='audiences/*'
                element={
                    <SuspenseView>
                        <AudienceRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='devices/*'
                element={
                    <SuspenseView>
                        <DeviceRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='languages/*'
                element={
                    <SuspenseView>
                        <LanguageRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='operating-systems/*'
                element={
                    <SuspenseView>
                        <OperatingSystemRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default MiscModuleRoutes;