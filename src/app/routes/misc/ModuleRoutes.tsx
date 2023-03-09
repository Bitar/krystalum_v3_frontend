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
    const LanguageRoutes = lazy(() => import('./LanguageRoutes'));
    const OperatingSystemRoutes = lazy(() => import('./OperatingSystemRoutes'));
    const GenderRoutes = lazy(() => import('./GenderRoutes'));
    const CampaignTypeRoutes = lazy(() => import('./CampaignTypeRoutes'));
    const RegionRoutes = lazy(() => import('./RegionRoutes'));
    const FormatRoutes = lazy(() => import('./FormatRoutes'));
    const AdServerRoutes = lazy(() => import('./AdServerRoutes'));
    const AdvertiserIndustryRoutes = lazy(() => import('./AdvertiserIndustryRoutes'));
    const BusinessUnitRoutes = lazy(() => import('./BusinessUnitRoutes'));
    const KpiRoutes = lazy(() => import('./KpiRoutes'));
    const ObjectiveRoutes = lazy(() => import('./ObjectiveRoutes'));
    const PerformanceMetricRoutes = lazy(() => import('./PerformanceMetricRoutes'));
    const VerticalRoutes = lazy(() => import('./VerticalRoutes'));
    const VideoPlayerRoutes = lazy(() => import('./VideoPlayerRoutes'));
    const WebsitePageRoutes = lazy(() => import('./WebsitePageRoutes'));
    const TierRoutes = lazy(() => import('./TierRoutes'));
    const CampaignRestrictionRequirementRoutes = lazy(() => import('./CampaignRestrictionRequirementRoutes'));

    return (
        <Routes>
            {/* Sections */}
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

            <Route
                path='formats/*'
                element={
                    <SuspenseView>
                        <FormatRoutes/>
                    </SuspenseView>
                }
            ></Route>

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

            <Route
                path='website-pages/*'
                element={
                    <SuspenseView>
                        <WebsitePageRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='tiers/*'
                element={
                    <SuspenseView>
                        <TierRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='campaign-restriction-requirements/*'
                element={
                    <SuspenseView>
                        <CampaignRestrictionRequirementRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default MiscModuleRoutes;