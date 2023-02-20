/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sections</span>
        </div>
      </div>

      <AsideMenuItemWithSub to='/iam' title='IAM' icon='/media/icons/duotune/general/gen049.svg'>
        <AsideMenuItem to='/iam/users' title='Users' hasBullet={true} />
        <AsideMenuItem to='/iam/roles' title='Roles' hasBullet={true} />
        <AsideMenuItem to='/iam/permissions' title='Permissions' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
