import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {User} from '../../../../models/iam/User';
import {getUser} from '../../../../requests/iam/User';
import {PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Nav, Tab} from 'react-bootstrap';
import EditProfile from './edit/EditProfile';
import ChangePassword from './edit/ChangePassword';

const UserEdit: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        if (id) {
            // get the user we need to edit from the database
            getUser(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the user to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    // unknown error occurred
                    navigate('/error/400');
                } else {
                    setUser(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // when we're here it means our user object is loaded from the API
        if (user) {
            krysApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.EDIT, user.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const settingsNav = [
        {
            title: 'Update profile',
            description: 'Update user\'s profile',
            icon: 'fa-duotone fa-user'
        },
        {
            title: 'Change password',
            description: 'Modify your login details',
            icon: 'fa-duotone fa-gears'
        }
    ]

    return (
        <KTCard className='mb-5'>
            <KTCardHeader text="Edit User" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

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
                                            <EditProfile user={user}/>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey='settingsNav-1'>
                                            <ChangePassword user={user}/>
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

export default UserEdit;