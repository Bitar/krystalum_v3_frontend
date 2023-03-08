import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const MiscModuleRoutes: React.FC = () => {
    const TechnologyRoutes = lazy(() => import('./TechnologyRoutes'));
    const BuyTypeRoutes = lazy(() => import('./BuyTypeRoutes'));
    const BookingTypeRoutes = lazy(() => import('./BookingTypeRoutes'));
    const CountryRoutes = lazy(() => import('./CountryRoutes'));
    const CityRoutes = lazy(() => import('./CityRoutes'));
    const BuyingModelRoutes = lazy(() => import('./BuyingModelRoutes'));
    const AudienceRoutes = lazy(() => import('./AudienceRoutes'));
    const DeviceRoutes = lazy(() => import('./DeviceRoutes'));
    const OperatingSystemRoutes = lazy(() => import('./OperatingSystemRoutes'));
    const GenderRoutes = lazy(() => import('./GenderRoutes'));
    const CampaignTypeRoutes = lazy(() => import('./CampaignTypeRoutes'));
    const RegionRoutes = lazy(() => import('./RegionRoutes'));

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

            <Route
                path='genders/*'
                element={
                    <SuspenseView>
                        <GenderRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='campaign-types/*'
                element={
                    <SuspenseView>
                        <CampaignTypeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='regions/*'
                element={
                    <SuspenseView>
                        <RegionRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default MiscModuleRoutes;