import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {AdvertiserIndustry} from '../../../../models/misc/AdvertiserIndustry';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';

const AdvertiserIndustriesColumns: ReadonlyArray<Column<AdvertiserIndustry>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => (
            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const accessControl = useAccessControl();

            return (<ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/advertiser-industries'}
                queryKey={QUERIES.ADVERTISER_INDUSTRIES_LIST}
                showView={true}
                showEdit={accessControl.userCan('manage-misc')}
                showDelete={accessControl.userCan('manage-misc')}
                title="Delete Advertiser Industry"
                text={`Are you sure you want to delete the advertiser industry '${props.data[props.row.index].name}'?`}
            />)
        },
    },
]

export {AdvertiserIndustriesColumns}
