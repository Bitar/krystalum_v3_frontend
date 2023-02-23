import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const MiscModuleRoutes: React.FC = () => {
    const TechnologyRoutes = lazy(() => import('./TechnologyRoutes'));
    const BuyTypeRoutes = lazy(() => import('./BuyTypeRoutes'));
    const BookingTypeRoutes = lazy(() => import('./BookingTypeRoutes'));

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
        </Routes>
    )
}

export default MiscModuleRoutes;