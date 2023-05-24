import React, {useEffect} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {RoleEnum} from '../../../../enums/RoleEnum';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useAuth} from '../../../../modules/auth';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {usePublisherEdit} from '../core/PublisherEditContext';
import PublisherOverview from '../partials/Overview';
import PublisherAccountManager from './edit/AccountManager';
import PublisherBasicInformationEdit from './edit/BasicInformation';
import PublisherContactCreate from './edit/contacts/Create';
import PublisherPaymentCreate from './edit/payments/Create';
import PublisherPublication from './edit/Publication';

const PublisherEdit: React.FC = () => {
    const {publisher} = usePublisherEdit();
    const {currentUser, hasRoles} = useAuth();
    const krysApp = useKrysApp();

    useEffect(() => {
        // when we're here it means our publisher object is loaded from the API
        if (publisher) {
            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.EDIT, publisher.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publisher]);

    let settingsNav = []

    if (hasRoles(currentUser, [RoleEnum.PUBLISHER])) {
        settingsNav = [
            {
                key: 'basic-information',
                title: 'Basic information',
                description: 'Update the publisher\'s details',
                icon: 'fa-duotone fa-gears'
            },
            {
                key: 'payment-details',
                title: 'Payment details',
                description: 'Input bank account details',
                icon: 'fa-duotone fa-bank'
            },
            {
                key: 'publications',
                title: 'Publications',
                description: 'Associated publications',
                icon: 'fa-duotone fa-browser'
            }
        ]
    } else {
        settingsNav = [
            {
                key: 'basic-information',
                title: 'Basic information',
                description: 'Update the publisher\'s details',
                icon: 'fa-duotone fa-gears'
            },
            {
                key: 'contact-details',
                title: 'Contact details',
                description: 'Enter the contacts\'s details',
                icon: 'fa-duotone fa-address-book'
            },
            {
                key: 'payment-details',
                title: 'Payment details',
                description: 'Input bank account details',
                icon: 'fa-duotone fa-bank'
            },
            {
                key: 'publications',
                title: 'Publications',
                description: 'Associated publications',
                icon: 'fa-duotone fa-browser'
            },
            {
                key: 'account-managers',
                title: 'Account managers',
                description: 'Point of contacts',
                icon: 'fa-duotone fa-user-tie'
            }
        ]
    }

    return (
        <>
            <PublisherOverview/>

            <KTCard className="mb-5">
                <KTCardHeader text="Edit Publisher"/>

                <KTCardBody>
                    <Tab.Container defaultActiveKey="settingsNav-basic-information">
                        <div className="row">
                            <div className="col-lg-4 col-xl-3">
                                <Nav variant="pills" className="flex-column settings-nav">
                                    {
                                        settingsNav.map((settings, index) => (
                                            <Nav.Item key={`settings-nav-${index}`} className="mb-5">
                                                <Nav.Link className="settings-nav-item"
                                                          eventKey={`settingsNav-${settings.key}`}>
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
                                        ))
                                    }
                                </Nav>
                            </div>
                            <div className="col-lg-8 col-xl-9">
                                <Tab.Content>
                                    <Tab.Pane eventKey="settingsNav-basic-information">
                                        <PublisherBasicInformationEdit/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-contact-details">
                                        <PublisherContactCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-payment-details">
                                        <PublisherPaymentCreate/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-publications">
                                        <PublisherPublication/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="settingsNav-account-managers">
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