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
                <AsideMenuItem to='/iam/users' title='Users' hasBullet={true}/>
                <AsideMenuItem to='/iam/roles' title='Roles' hasBullet={true}/>
                <AsideMenuItem to='/iam/permissions' title='Permissions' hasBullet={true}/>
            </AsideMenuItemWithSub>

            <AsideMenuItemWithSub to='/misc' title='Miscellaneous' icon='/media/icons/duotune/general/gen022.svg'>
                <AsideMenuItem to='/misc/ad-servers' title='Ad servers' hasBullet={true}/>
                <AsideMenuItem to='/misc/advertiser-industries' title='Advertiser industries' hasBullet={true}/>
                <AsideMenuItem to='/misc/audiences' title='Audiences' hasBullet={true}/>
                <AsideMenuItem to='/misc/booking-types' title='Booking types' hasBullet={true}/>
                <AsideMenuItem to='/misc/business-units' title='Business units' hasBullet={true}/>
                <AsideMenuItem to='/misc/buy-types' title='Buy types' hasBullet={true}/>
                <AsideMenuItem to='/misc/buying-models' title='Buying models' hasBullet={true}/>
                <AsideMenuItem to='/misc/campaign-types' title='Campaign types' hasBullet={true}/>
                <AsideMenuItem to='/misc/cities' title='Cities' hasBullet={true}/>
                <AsideMenuItem to='/misc/countries' title='Countries' hasBullet={true}/>
                <AsideMenuItem to='/misc/devices' title='Devices' hasBullet={true}/>
                <AsideMenuItem to='/misc/genders' title='Genders' hasBullet={true}/>
                <AsideMenuItem to='/misc/kpis' title='KPIs' hasBullet={true}/>
                <AsideMenuItem to='/misc/languages' title='Languages' hasBullet={true}/>
                <AsideMenuItem to='/misc/operating-systems' title='Operating systems' hasBullet={true}/>
                <AsideMenuItem to='/misc/performance-metrics' title='Performance metrics' hasBullet={true}/>
                <AsideMenuItem to='/misc/regions' title='Regions' hasBullet={true}/>
                <AsideMenuItem to='/misc/technologies' title='Technologies' hasBullet={true}/>
                <AsideMenuItem to='/misc/verticals' title='Verticals' hasBullet={true}/>
                <AsideMenuItem to='/misc/video-players' title='Video players' hasBullet={true}/>
            </AsideMenuItemWithSub>
        </>
    )
}
