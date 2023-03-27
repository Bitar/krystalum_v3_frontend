import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {Sections} from '../../helpers/sections';
import AdvertiserEdit from '../../sections/demand/advertisers/pages/Edit';
import AdvertiserContactEdit from '../../sections/demand/advertisers/pages/edit/contacts/Edit';
import {AdvertiserContext} from '../../sections/demand/advertisers/core/AdvertiserContext';
import {Advertiser} from '../../models/demand/Advertiser';
import {getAdvertiser} from '../../requests/demand/Advertiser';
import axios from 'axios';

const AdvertiserEditRoutes: React.FC = () => {
    const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the advertiser we need to edit from the database
            getAdvertiser(parseInt(id), ['info']).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the advertiser to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setAdvertiser(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const advertiserEditBreadcrumbs: Array<PageLink> = [
        {
            title: Sections.DEMAND_ADVERTISERS,
            path: '/demand/advertisers/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        },
        {
            title: advertiser?.name || '',
            path: `/demand/advertisers/${advertiser?.id}/edit`,
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        }
    ];

    return (
        <AdvertiserContext.Provider value={{
            advertiser: advertiser,
            setAdvertiser: setAdvertiser
        }}>
            <Routes>
                <Route
                    path='/edit'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={advertiserEditBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            <AdvertiserEdit/>
                        </SuspenseView>
                    }
                />
                <Route
                    path='/contacts/:cid/edit'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={advertiserEditBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            <AdvertiserContactEdit/>
                        </SuspenseView>
                    }
                />
            </Routes>
        </AdvertiserContext.Provider>
    )
}

export default AdvertiserEditRoutes;