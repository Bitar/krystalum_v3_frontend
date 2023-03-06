import React, {createContext, FC, useContext, useEffect} from 'react'
import {Role} from '../../models/iam/Role';
import {Permission} from '../../models/iam/Permission';
import {useAuth} from './core/Auth';
import {useLocation, useNavigate} from 'react-router-dom';
import {RoutePermissionMapper} from '../../helpers/RoutePermissionMapper';

interface AccessControlContextProps {
    userCan: (permission: string) => boolean
}

const initAuthAccessControlContextPropsState: AccessControlContextProps = {
    userCan: () => false,
}

const AccessControlContext = createContext<AccessControlContextProps>(initAuthAccessControlContextPropsState)

type AccessControlProviderProps = {}

const AccessControlProvider: FC<React.PropsWithChildren<AccessControlProviderProps>> = ({children}) => {
    const {currentUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const regexToPermissionsMap = new RoutePermissionMapper();

    // Creates a method that returns whether the requested permission is available in the list of permissions
    // passed as parameter
    const userCan = (permission: string) => {
        let exist = false;

        currentUser?.roles?.forEach((role: Role) => {
            role?.permissions?.forEach((p: Permission) => {
                if (p.name === permission) {
                    exist = true;
                }
            })
        })

        return exist;
    }

    useEffect(() => {
        const currentUrl = location.pathname;

        let requiredPermission: string | null = null

        for (const [regex, str] of regexToPermissionsMap.regexMap) {
            if (regex.test(currentUrl)) {
                requiredPermission = str;
            }
        }

        if(requiredPermission && !userCan(requiredPermission)) {
            navigate('/error/403');
        }
        // eslint-disable-next-line
    }, []);


    // This component will render its children wrapped around a AccessControlContext's provider whose
    // value is set to the method defined above
    return <AccessControlContext.Provider value={{userCan}}>{children}</AccessControlContext.Provider>
}

type RestrictedProps = { to: string }

const useAccessControl = () => {
    return useContext(AccessControlContext)
}

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted: FC<React.PropsWithChildren<RestrictedProps>> = ({to, children}) => {
    // We "connect" to the provider thanks to the AccessControlContext
    const {userCan} = useContext(AccessControlContext)

    // If the user has that permission, render the children
    if (userCan(to)) {
        return <>{children}</>
    }

    return null;
}

export {AccessControlProvider, Restricted, useAccessControl}
