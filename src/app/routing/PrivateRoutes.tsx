import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {SuspenseView} from '../components/SuspenseView'
import {lazy} from 'react'

export const PrivateRoutes = () => {
    const UserPage = lazy(() => import('../sections/iam/user/pages/UserPage'))

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                {/* Pages */}

                {/* Sections */}
                <Route path='iam/users/*'
                       element={
                           <SuspenseView>
                               <UserPage/>
                           </SuspenseView>
                       }
                ></Route>
                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}
