import {Link} from 'react-router-dom'
import React, {FC} from 'react'
import clsx from 'clsx'

type Props = {
  name: string
  url?: string
  showAdd?: boolean
  showFilter?: boolean
}

const TableListToolbar: FC<React.PropsWithChildren<Props>> = ({name, url, showAdd, showFilter}) => {
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* begin::Export */}
      {/*<button type='button' className='btn btn-light-primary me-3'>*/}
      {/*    <KTSVG path='/media/icons/duotune/arr078.svg' className='svg-icon-2'/>*/}
      {/*    Export*/}
      {/*</button>*/}
      {/* end::Export */}

      {/*{showFilter &&*/}
      {/*  <button type='button' className='btn btn-light-info me-3' disabled={isLoading}>*/}
      {/*    <KTSVG path='/media/icons/duotune/gen031.svg' className='svg-icon-2' />*/}
      {/*    Filter*/}
      {/*  </button>*/}
      {/*}*/}

      {showAdd && (
        <Link to={url + '/create'} className='btn-icon btn btn-primary'>
          <i className={clsx('fa fs-2', 'fa-plus')}></i>
        </Link>
      )}
    </div>
  )
}

export {TableListToolbar}
