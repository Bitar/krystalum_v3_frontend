import {useAuth} from '../../../../app/modules/auth'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'

/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar = () => {
  const {currentUser} = useAuth()

  return (
    <>
      <div className='aside-user d-flex align-items-sm-center justify-content-center py-5'>
        <div className='symbol symbol-50px'>
          <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
        </div>

        <div className='aside-user-info flex-row-fluid flex-wrap ms-5'>
          <div className='d-flex'>
            <div className='flex-grow-1 me-2'>
              <span className='text-white fs-6 fw-bold'>{currentUser?.name}</span>

              <span className='text-gray-600 fw-bold d-block fs-8 mb-1'>Main Role</span>
            </div>

            <div className='me-n2'>
              <a
                href='#'
                className='btn btn-icon btn-sm btn-active-color-primary mt-n2'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-start'
                data-kt-menu-overflow='false'
              >
                <KTSVG
                  path='/media/icons/duotune/coding/cod001.svg'
                  className='svg-icon-muted svg-icon-12'
                />
              </a>

              <HeaderUserMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {AsideToolbar}
