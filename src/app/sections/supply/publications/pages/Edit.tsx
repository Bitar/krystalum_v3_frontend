import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';

import {PageTypes} from '../../../../helpers/variables';
import {Publication} from '../../../../models/supply/publication/Publication';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getPublication} from '../../../../requests/supply/publication/Publication';
import {usePublication} from '../core/PublicationContext';
import PublicationOverview from '../partials/Overview';
import PublicationAdServerCreate from './edit/ad-servers/Create';
import PublicationAdTechnologyIndex from './edit/ad-technologies/Index';
import PublicationAnalyticCreate from './edit/analytics/Create';
import PublicationBasicInformationEdit from './edit/BasicInformation';
import PublicationFixedCpmCreate from './edit/fixed-cpms/Create';
import PublicationFormatCreate from './edit/formats/Create';
import PublicationMinimumEcpmCreate from './edit/minimum-ecpms/Create';
import PublicationTechnologyCreate from './edit/technologies/Create';
import PublicationVerticalCreate from './edit/verticals/Create';

const PublicationEdit: React.FC = () => {
    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    const [publication, setPublication] = useState<Publication | null>(null);

    useEffect(() => {
        if (id) {
            // get the publication we need to edit from the database
            getPublication(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publication to edit so we need to redirect
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
    }, [id]);

    useEffect(() => {
        // when we're here it means our publication object is loaded from the API
        if (publication) {
            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATIONS, PageTypes.EDIT, publication.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const settingsNav = [
        {
            title: 'Basic information',
            description: 'Update the publication\'s details',
            icon: 'fa-duotone fa-gears'
        },
        {
            title: 'Google Analytics Data',
            description: 'Record the Google Analytics Data shared by the publisher',
            icon: 'fa-duotone fa-chart-waterfall'
        },
        {
            title: 'Formats',
            description: 'Keep track of the formats available on the publication',
            icon: 'fa-duotone fa-newspaper'
        },
        {
            title: 'Verticals',
            description: 'Describe what the publication is about by assigning it one or more categories',
            icon: 'fa-duotone fa-tags'
        },
        {
            title: 'Ad Servers',
            description: 'Quickly access and update the list of ad servers associated with the publication',
            icon: 'fa-duotone fa-browser'
        },
        {
            title: 'Technologies',
            description: 'Comprehensive list of all the publication\'s integrated technologies',
            icon: 'fa-duotone fa-microchip'
        },
        {
            title: 'Fixed CPM (NET)',
            description: 'Easily access your publication\'s Fixed CPM values by setting them here',
            icon: 'fa-duotone fa-dollar-sign'
        },
        {
            title: 'Minimum eCPM (NET)',
            description: 'Keep track of your publication\'s rates by entering the details here',
            icon: 'fa-duotone fa-wallet'
        },
        {
            title: 'Ad Technology Partners',
            description: 'Automatically extracted for a website\'s robots.txt for ease of access',
            icon: 'fa-duotone fa-robot'
        },
        {
            title: 'Campaign Restrictions',
            description: 'Keep the campaign restrictions up-to-date for productive and correct filtering',
            icon: 'fa-duotone fa-shield-quartered'
        },
    ]

    return (
        <>
            <PublicationOverview/>

            <KTCard className="mb-5">
                <KTCardHeader text="Edit Publication"/>

                <KTCardBody>
                    <Tab.Container defaultActiveKey="settingsNav-0">
                        <div className="row">
                            <div className="col-lg-4 col-xl-3">
                                <Nav variant="pills" className="flex-column settings-nav">
                                    {settingsNav.map((settings, index) => (
                                        <Nav.Item key={`settings-nav-${index}`} className="mb-5">
                                            <Nav.Link className="settings-nav-item" eventKey={`settingsNav-${index}`}>
                                                <div className="settings-nav-icon w-25px h-25px bg-transparent">
                                                    <i className={`${settings.icon}`}></i>
                                                </div>
                                                <div className="settings-nav-label">
                                                <span
                                                    className="settings-nav-title text-gray-800">{settings.title}</span>
                                                    <span
                                                        className="settings-nav-desc text-gray-500">{settings.description}</span>
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </div>
                            <div className="col-lg-8 col-xl-9">
                                <Tab.Content>
                                    <Tab.Pane eventKey="settingsNav-0">
                                        <PublicationBasicInformationEdit/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-1">
                                        <PublicationAnalyticCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-2">
                                        <PublicationFormatCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-3">
                                        <PublicationVerticalCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-4">
                                        <PublicationAdServerCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-5">
                                        <PublicationTechnologyCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-6">
                                        <PublicationFixedCpmCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-7">
                                        <PublicationMinimumEcpmCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-8">
                                        <PublicationAdTechnologyIndex/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </KTCardBody>
            </KTCard>
        </>
    )
};

export default PublicationEdit;