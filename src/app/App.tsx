import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {KrysApp} from './modules/general/KrysApp';
import {AccessControlProvider} from './modules/auth/AuthAccessControl';

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <I18nProvider>
                <LayoutProvider>
                    <AuthInit>
                        <AccessControlProvider>
                            <KrysApp>
                                <Outlet/>
                                <MasterInit/>
                            </KrysApp>
                        </AccessControlProvider>
                    </AuthInit>
                </LayoutProvider>
            </I18nProvider>
        </Suspense>
    )
}

export {App}
