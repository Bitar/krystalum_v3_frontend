import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import axios from 'axios';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {Nav, Tab} from 'react-bootstrap';
import {Advertiser} from '../../../../models/demand/Advertiser';
import {getAdvertiser} from '../../../../requests/demand/Advertiser';
import AdvertiserInfoEdit from './edit/Info';
import AdvertiserContactEdit from './edit/Contact';
import {AdvertiserContext} from '../core/AdvertiserContext';

const AdvertiserEdit: React.FC = () => {
    const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

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

    useEffect(() => {
        // when we're here it means our advertiser object is loaded from the API
        if (advertiser) {
            krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_ADVERTISERS, PageTypes.EDIT, advertiser.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advertiser]);

    const settingsNav = [
        {
            title: 'Basic information',
            description: "Update the advertiser's details",
            icon: 'fa-duotone fa-gears'
        },
        {
            title: 'Contact details',
            description: 'Enter the contact details to reach the advertiser',
            icon: 'fa-duotone fa-address-book'
        }
    ]

    return (
        <KTCard className='mb-5'>
            <KTCardHeader text="Edit Advertiser" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <Tab.Container defaultActiveKey='settingsNav-0'>
                    <div className='row'>
                        <div className='col-lg-4 col-xl-3'>
                            <Nav variant='pills' className='flex-column settings-nav'>
                                {settingsNav.map((settings, index) => (
                                    <Nav.Item key={`settings-nav-${index}`} className='mb-5'>
                                        <Nav.Link className='settings-nav-item' eventKey={`settingsNav-${index}`}>
                                            <div className='settings-nav-icon w-25px h-25px bg-transparent'>
                                                <i className={`${settings.icon}`}></i>
                                            </div>
                                            <div className='settings-nav-label'>
                                                <span
                                                    className='settings-nav-title text-gray-800'>{settings.title}</span>
                                                <span
                                                    className='settings-nav-desc text-gray-500'>{settings.description}</span>
                                            </div>
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className='col-lg-8 col-xl-9'>
                            <AdvertiserContext.Provider value={{
                                advertiser: advertiser,
                                setAdvertiser: setAdvertiser
                            }}>
                                <Tab.Content>
                                    <Tab.Pane eventKey='settingsNav-0'>
                                        <AdvertiserInfoEdit />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey='settingsNav-1'>
                                        <AdvertiserContactEdit />
                                    </Tab.Pane>
                                </Tab.Content>
                            </AdvertiserContext.Provider>
                        </div>
                    </div>
                </Tab.Container>
            </KTCardBody>
        </KTCard>)
};

export default AdvertiserEdit;