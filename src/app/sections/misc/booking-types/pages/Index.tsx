import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {exportBookingTypes, getBookingTypes} from '../../../../requests/misc/BookingType';
import BookingTypeIndexFilter from '../partials/IndexFilter';
import {BookingTypesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import {exportAudiences} from '../../../../requests/misc/Audience';

const BookingTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BOOKING_TYPES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.BOOKING_TYPE_LIST} requestFunction={getBookingTypes}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='booking type'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Booking Types' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportBookingTypes),
                                          new FilterCardAction('booking-types-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/booking-types', 'manage-misc')]}/>

                        <KTCardBody>
                            <BookingTypeIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <BookingTypeTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const BookingTypeTable = () => {
    const bookingTypes = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => bookingTypes, [bookingTypes]);
    const columns = useMemo(() => BookingTypesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={bookingTypes.length > 0 ? bookingTypes[0] : null}
                   isLoading={isLoading}/>
    )
}

export default BookingTypeIndex;
