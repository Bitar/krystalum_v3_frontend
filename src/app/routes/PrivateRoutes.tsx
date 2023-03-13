import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from './home/DashboardWrapper'
// import {SuspenseView} from '../components/misc/SuspenseView'
// import {lazy} from 'react'
import IamModuleRoutes from './iam/ModuleRoutes';
import MiscModuleRoutes from './misc/ModuleRoutes';
import DemandModuleRoutes from './demand/ModuleRoutes';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                {/* Pages */}

                {/* IAM section */}
                <Route path='iam/*' element={<IamModuleRoutes/>}/>

                {/* Demand section */}
                <Route path='demand/*' element={<DemandModuleRoutes/>}/>

                {/* Miscellaneous section */}
                <Route path='misc/*' element={<MiscModuleRoutes/>}/>

                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}
