import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const SupplyModuleRoutes: React.FC = () => {
    const PublisherRoutes = lazy(() => import('./PublisherRoutes'));
    const PublicationRoutes = lazy(() => import('./PublicationRoutes'));

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

            <Route
                path='publications/*'
                element={
                    <SuspenseView>
                        <PublicationRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default SupplyModuleRoutes;