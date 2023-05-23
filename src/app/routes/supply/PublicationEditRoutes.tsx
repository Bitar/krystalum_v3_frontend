import axios from 'axios';
import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {Sections} from '../../helpers/sections';
import {getPublication} from '../../requests/supply/publication/Publication';
import {usePublicationEdit} from '../../sections/supply/publications/core/PublicationEditContext';
import PublicationEdit from '../../sections/supply/publications/pages/Edit';
import PublicationAdServerEdit from '../../sections/supply/publications/pages/edit/ad-servers/Edit';
import PublicationAnalyticEdit from '../../sections/supply/publications/pages/edit/analytics/Edit';
import PublicationFixedCpmEdit from '../../sections/supply/publications/pages/edit/fixed-cpms/Edit';
import PublicationFormatEdit from '../../sections/supply/publications/pages/edit/formats/Edit';
import PublicationMinimumEcpmEdit from '../../sections/supply/publications/pages/edit/minimum-ecpms/Edit';
import PublicationTechnologyEdit from '../../sections/supply/publications/pages/edit/technologies/Edit';
import PublicationVerticalEdit from '../../sections/supply/publications/pages/edit/verticals/Edit';

const PublicationEditRoutes: React.FC = () => {
    const {publication, setPublication, refresh} = usePublicationEdit();

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the publication we need to edit from the database
            getPublication(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publication to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setPublication(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refresh]);

    const publicationEditBreadcrumbs: Array<PageLink> = [
        {
            title: Sections.SUPPLY_PUBLICATIONS,
            path: '/supply/publications/',
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
            title: publication?.name || '',
            path: `/supply/publications/${publication?.id}/edit`,
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
        <Routes>
            <Route
                path="/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/analytics/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationAnalyticEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/formats/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationFormatEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/verticals/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationVerticalEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/ad-servers/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationAdServerEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/technologies/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationTechnologyEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/fixed-cpms/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationFixedCpmEdit/>
                    </SuspenseView>
                }
            />
            <Route
                path="/minimum-ecpms/:cid/edit"
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={publicationEditBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationMinimumEcpmEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PublicationEditRoutes;