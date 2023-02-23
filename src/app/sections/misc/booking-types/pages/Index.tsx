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
import {Actions, PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {getBookingTypes} from '../../../../requests/misc/BookingType';
import BookingTypeIndexFilter from '../partials/IndexFilter';
import {BookingTypesColumns} from '../core/TableColumns';

const BookingTypeIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BOOKING_TYPES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.BOOKING_TYPE_LIST} requestFunction={getBookingTypes}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='booking type' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Booking Types' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{
                            type: Actions.FILTER,
                            target: 'booking-types-list-filter',
                            showFilter: showFilter,
                            setShowFilter: setShowFilter
                        }, {type: Actions.CREATE, url: '/misc/booking-types'}]}/>

                        <KTCardBody>
                            <BookingTypeIndexFilter showFilter={showFilter} />

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
        <KrysTable data={data} columns={columns} model={bookingTypes.length > 0 ? bookingTypes[0] : null} isLoading={isLoading} />
    )
}

export default BookingTypeIndex;
