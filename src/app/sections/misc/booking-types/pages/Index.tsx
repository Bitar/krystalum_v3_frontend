import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getBookingTypes} from '../../../../requests/misc/BookingType';
import {BookingTypesColumns} from '../core/TableColumns';
import BookingTypeIndexFilter from '../partials/IndexFilter';

const BookingTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BOOKING_TYPES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.BOOKING_TYPES_LIST}
                   requestFunction={getBookingTypes}
                   columnsArray={BookingTypesColumns}
                   cardHeader={
                       {
                           text: 'All Booking Types',

                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('booking-types-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/booking-types', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={BookingTypeIndexFilter}
        />
    )
}

export default BookingTypeIndex;
