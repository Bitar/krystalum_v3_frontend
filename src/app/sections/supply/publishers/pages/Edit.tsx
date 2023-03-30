import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Nav, Tab} from 'react-bootstrap';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';

import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Publisher} from '../../../../models/supply/publisher/Publisher';
import {getPublisher} from '../../../../requests/supply/publisher/Publisher';
import BasicInformation from './edit/BasicInformation';
import PublisherOverview from '../partials/Overview';
import PublisherPublication from './edit/Publication';
import PublisherAccountManager from './edit/AccountManager';
import {PublisherContext} from '../core/PublisherContext';
import PublisherContactCreate from './edit/contacts/Create';
import PublisherPaymentCreate from './edit/payments/Create';

const PublisherEdit: React.FC = () => {
    const [publisher, setPublisher] = useState<Publisher | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        if (id) {
            // get the publisher we need to edit from the database
            getPublisher(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publisher to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setPublisher(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // when we're here it means our publisher object is loaded from the API
        if (publisher) {
            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.EDIT, publisher.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    const settingsNav = [
        {
            title: 'Basic information',
            description: 'Update the publisher\'s details',
            icon: 'fa-duotone fa-gears'
        },
        {
            title: 'Contact details',
            description: 'Enter the contacts\'s details',
            icon: 'fa-duotone fa-address-book'
        },
        {
            title: 'Payment details',
            description: 'Input bank account details',
            icon: 'fa-duotone fa-bank'
        },
        {
            title: 'Publications',
            description: 'Associated publications',
            icon: 'fa-duotone fa-browser'
        },
        {
            title: 'Account managers',
            description: 'Point of contacts',
            icon: 'fa-duotone fa-user-tie'
        }
    ]

    return (
        <>
            <PublisherOverview/>

            <KTCard className="mb-5">
                <KTCardHeader text="Edit Publisher"/>

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
                                        <BasicInformation/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-1">
                                        <PublisherContactCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-2">
                                        <PublisherPaymentCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-3">
                                        <PublisherPublication/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-4">
                                        <PublisherAccountManager/>
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

export default PublisherEdit;