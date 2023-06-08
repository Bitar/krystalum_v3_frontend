import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers';
import {BuyingModel} from '../../../../models/misc/BuyingModel';
import {Format} from '../../../../models/misc/Format';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {BadgesCell} from '../../../../modules/table/columns/BadgesCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';

import {TextCell} from '../../../../modules/table/columns/TextCell';

const FormatsColumns: ReadonlyArray<Column<Format>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Code' className='min-w-125px'/>,
        id: 'code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].code}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Parent' className='min-w-125px'/>,
        id: 'parent',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].parent?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Buying Models' className='min-w-150px'/>,
        id: 'buyingModels',
        Cell: ({...props}) => <BadgesCell
            texts={props.data[props.row.index].buyingModels.map((buyingModel: BuyingModel) => buyingModel.name)}
            color='light-info' align='left'/>,
    },
    {
        Header: (props) => (

            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>

        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/formats'}
                    queryKey={QUERIES.FORMATS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Formats"
                    text={`Are you sure you want to delete the formats '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {FormatsColumns}
