/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {ResetPassword} from './components/ResetPassword';

const AuthLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => {}
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed bg-dark'>
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/logo-krystalum.png')}
            className='theme-dark-show h-100px'
          />
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/logo-krystalum.png')}
            className='theme-light-show h-100px'
          ></img>
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      {/*<div className='d-flex flex-center flex-column-auto p-10'>*/}
      {/*  <div className='d-flex align-items-center fw-semibold fs-6'>*/}
      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      About*/}
      {/*    </a>*/}

      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      Contact*/}
      {/*    </a>*/}

      {/*    <a href='#' className='text-muted text-hover-primary px-2'>*/}
      {/*      Contact Us*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/* end::Footer */}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
