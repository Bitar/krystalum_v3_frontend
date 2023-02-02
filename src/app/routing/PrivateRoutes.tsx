import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {SuspenseView} from '../components/SuspenseView'
import {lazy} from 'react'

export const PrivateRoutes = () => {
    const UserRoutes = lazy(() => import('../routes/iam/UserRoutes'));
    const PermissionRoutes = lazy(() => import('../routes/iam/PermissionRoutes'));
    const RoleRoutes = lazy(() => import('../routes/iam/RoleRoutes'));

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                {/* Pages */}

                {/* Sections */}
                <Route
                    path='iam/users/*'
                    element={
                        <SuspenseView>
                            <UserRoutes/>
                        </SuspenseView>
                    }
                ></Route>

                <Route
                    path='iam/permissions/*'
                    element={
                        <SuspenseView>
                            <PermissionRoutes/>
                        </SuspenseView>
                    }
                ></Route>

                <Route
                    path='iam/roles/*'
                    element={
                        <SuspenseView>
                            <RoleRoutes/>
                        </SuspenseView>
                    }
                ></Route>
                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}
