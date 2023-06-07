import React, {useEffect, useState} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {PageTypes} from '../../../../helpers/variables';
import {User} from '../../../../models/iam/User';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {getUser} from '../../../../requests/iam/User';
import ChangePassword from './edit/ChangePassword';
import EditProfile from './edit/EditProfile';

const UserEdit: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    let {id} = useParams();

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        if (id) {
            // get the user we need to edit from the database
            submitRequest(getUser, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
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
            <KTCardHeader text="Edit User"/>

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