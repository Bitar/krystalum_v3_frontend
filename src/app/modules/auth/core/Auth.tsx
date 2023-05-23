import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {Permission} from '../../../models/iam/Permission';
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {User} from '../../../models/iam/User'
import {Role} from '../../../models/iam/Role';

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: User | undefined
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>
  logout: () => void,
  hasRoles: (user: User | undefined, roles: string[]) => boolean,
  hasAnyRoles: (user: User | undefined, roles: string[]) => boolean,
  hasPermissions: (user: User | undefined, permissions: string[]) => boolean,
  hasAnyPermissions: (user: User | undefined, permissions: string[]) => boolean,
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {
  },
  currentUser: undefined,
  setCurrentUser: () => {
  },
  logout: () => {
  },
  hasRoles: () => false,
  hasAnyRoles: () => false,
  hasPermissions: () => false,
  hasAnyPermissions: () => false,
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  const hasRoles = (user: User | undefined, roles: string[]) => {
    // this function will loop over the provided user's roles
    // and returns true if he has all roles (can be used for single case where
    // we need to know if the user has a single role)
    let foundNotExist = false;

    roles.forEach((roleName: string) => {
      // we loop over each role name and we check if the user has it
      let exist = false;

      // we then check if the user has the role
      user?.roles?.forEach((role: Role) => {
        if (role.name === roleName) {
          exist = true;
        }
      });

      if (!exist) {
        foundNotExist = true;
      }
    });

    return !foundNotExist;
  }

  const hasAnyRoles = (user: User | undefined, roles: string[]) => {
    // this function will loop over the provided user's roles
    // and returns true if he has any of the roles
    let exist = false;

    user?.roles?.forEach((role: Role) => {
      if (roles.includes(role.name)) {
        exist = true;
      }
    });

    return exist;
  }

  const hasPermissions = (user: User | undefined, permissions: string[]): boolean => {
    // if user is undefined, hence, the user doesn't have any permissions
    if (!user) return false;

    // extract all the permissions from the user's roles
    const userPermissions: Permission[] = user.roles.flatMap(role => role.permissions);

    // extract names of the user permissions
    const userPermissionNames: string[] = userPermissions.map(permission => permission.name);

    // iterate over each permission in the permissions array and check if it's included in the userPermissionNames array
    // if any of the permissions is not found in userPermissionNames, we return false
    // otherwise, we return true
    // `every` method returns a boolean value indicating whether all elements meet the specified condition
    return permissions.every(permission => userPermissionNames.includes(permission));
  }

  const hasAnyPermissions = (user: User | undefined, permissions: string[]): boolean => {
    // if user is undefined, hence, the user doesn't have any permissions
    if (!user) return false;

    // extract all the permissions from the user's roles
    const userPermissions: Permission[] = user.roles.flatMap(role => role.permissions);

    // iterate over each permission in userPermissions and check if it exists in the permissions array
    // if any of the permissions is found in permissions, we return true
    // otherwise, we return false
    // some function allows us to exit the iteration as soon as a matching permission is found,
    // providing early termination when a match is detected
    return userPermissions.some(permission => permissions.includes(permission.name));
  }

  return (
      <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, hasRoles, hasAnyRoles, hasPermissions, hasAnyPermissions}}>
        {children}
      </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken(apiToken)

          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.token) {
      requestUser(auth.token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen/> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
