/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'

const HeaderUserMenu: FC = () => {
    const {currentUser, logout, auth, saveAuth} = useAuth();

    const unimpersonateUser = function () {
        // we just need to update the auth user to have the impersonated user id
        // remove existing impersonatedUserId
        if (auth) {
            const {impersonatedUserId, ...newAuth} = auth

            saveAuth(newAuth);

            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    }

    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
            data-popper-placement='bottom-start'
        >
            <div className='menu-item px-3 text-truncate'>
                <div className='menu-content d-flex align-items-center px-3'>
                    <div className='symbol symbol-50px me-5'>
                        <img alt='Logo' src={currentUser?.image}/>
                    </div>

                    <div className='d-flex flex-column'>
                        <div className='fw-bolder d-flex align-items-center fs-5'>{currentUser?.name}</div>
                        <span className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </span>
                    </div>
                </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
                <Link to={`/iam/users/${currentUser?.id}`} className='menu-link px-5'>
                    My Profile
                </Link>
            </div>

            {
                auth?.impersonatedUserId ?
                    <>
                        <div className='separator my-2'></div>

                        <div className='menu-item px-5'>
                            <a onClick={unimpersonateUser} className='menu-link px-5'>
                                Unimpersonate
                            </a>
                        </div>
                    </>
                    :
                    <>
                        <div className='separator my-2'></div>

                        <div className='menu-item px-5'>
                            <a onClick={logout} className='menu-link px-5'>
                                Sign Out
                            </a>
                        </div>
                    </>
            }
        </div>
    )
}

export {HeaderUserMenu}
