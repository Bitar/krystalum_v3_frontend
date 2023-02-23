import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const MiscModuleRoutes: React.FC = () => {
    const TechnologyRoutes = lazy(() => import('./TechnologyRoutes'));
    const BuyTypeRoutes = lazy(() => import('./BuyTypeRoutes'));
    const BookingTypeRoutes = lazy(() => import('./BookingTypeRoutes'));
    const CountryRoutes = lazy(() => import('./CountryRoutes'));
    const CityRoutes = lazy(() => import('./CityRoutes'));

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
        </Routes>
    )
}

export default MiscModuleRoutes;