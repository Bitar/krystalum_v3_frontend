import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const SupplyModuleRoutes: React.FC = () => {
    const PublisherRoutes = lazy(() => import('./PublisherRoutes'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='publishers/*'
                element={
                    <SuspenseView>
                        <PublisherRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default SupplyModuleRoutes;