import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import BookingTypeIndex from '../../sections/misc/booking-types/pages/Index';
import BookingTypeCreate from '../../sections/misc/booking-types/pages/Create';
import BookingTypeEdit from '../../sections/misc/booking-types/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_BOOKING_TYPES,
        path: '/misc/booking-types/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const BookingTypeRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_BOOKING_TYPES}</PageTitle>
                    <BookingTypeIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <BookingTypeCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <BookingTypeEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default BookingTypeRoutes;
