import React from 'react';
import {Column} from 'react-table'
import {PublicationAdTechnology} from '../../../../../../models/supply/publication/PublicationAdTechnology';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';

const PublicationAdTechnologiesColumns: ReadonlyArray<Column<PublicationAdTechnology>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Technology" className="min-w-125px"/>,
        id: 'technology',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].technology}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Type" className="min-w-125px"/>,
        id: 'type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].type}/>,
    }
]

export {PublicationAdTechnologiesColumns}
