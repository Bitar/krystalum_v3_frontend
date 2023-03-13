import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const DemandModuleRoutes: React.FC = () => {
    const TradingDeskRoutes = lazy(() => import('./TradingDeskRoutes'));

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
        </Routes>
    )
}

export default DemandModuleRoutes;