import React, {useEffect, useState} from 'react';
import {Campaign} from '../../../../models/demand/Campaign';
import {useNavigate, useParams} from 'react-router-dom';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import axios from 'axios';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {getCampaign} from '../../../../requests/demand/Campaign';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {Nav, Tab} from 'react-bootstrap';
import EditDetails from './edit/EditDetails';
import EditOwnership from './edit/EditOwnership';


const CampaignEdit: React.FC = () => {
    const [campaign, setCampaign] = useState<Campaign | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        if (id) {
            // get the user we need to edit from the database
            getCampaign(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the user to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setCampaign(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // when we're here it means our user object is loaded from the API
        if (campaign) {
            krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_CAMPAIGNS, PageTypes.EDIT, campaign.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaign]);

    const settingsNav = [
        {
            title: 'Basic information',
            description: "Update the campaign's details",
            icon: 'fa-duotone fa-gears'
        },
        {
            title: 'Ownership',
            description: 'Assign point of contact',
            icon: 'fa-duotone fa-user'
        }
    ]

    return (
        <KTCard className='mb-5'>
            <KTCardHeader text="Edit Campaign"/>

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
                            <Tab.Content>
                                {
                                    <>
                                        <Tab.Pane eventKey='settingsNav-0'>
                                            <EditDetails campaign={campaign}/>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey='settingsNav-1'>
                                            <EditOwnership campaign={campaign}/>
                                        </Tab.Pane>
                                    </>
                                }
                            </Tab.Content>
                        </div>
                    </div>
                </Tab.Container>
            </KTCardBody>
        </KTCard>)
};

export default CampaignEdit;