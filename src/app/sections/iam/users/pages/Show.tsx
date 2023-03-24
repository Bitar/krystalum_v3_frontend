import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom'

import {User} from '../../../../models/iam/User';
import {getUser} from '../../../../requests/iam/User';
import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {EditCardAction} from '../../../../components/misc/CardAction';

const UserShow: React.FC = () => {
    const [user, setUser] = useState<User|null>(null);

    const krysApp = useKrysApp();

    let {id} = useParams();

    const navigate = useNavigate();

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
        if(user) {
            krysApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.SHOW, user.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <KTCard className='mb-5 mb-xl-10'>
            <KTCardHeader text='Overview' icon="fa-regular fa-circle-info" icon_style="fs-3 text-info" actions={[new EditCardAction(`/iam/users/${user?.id}`, 'manage-iam')]} />

            <KTCardBody className='pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                    {
                        user?.image ? <div className='me-7 mb-4'>
                            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                                <img src={user.image} alt={user.name} />
                            </div>
                        </div> : <></>
                    }

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center mb-2'>
                                    <span className='text-gray-800 fs-2 fw-bolder me-1'>
                                        {user?.name}
                                    </span>
                                </div>

                                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                                    <span className='d-flex align-items-center text-gray-400 me-5 mb-2'>
                                        <KTSVG
                                            path='/media/icons/duotune/communication/com006.svg'
                                            className='svg-icon-4 me-1'
                                        />
                                        {user?.roles.map((role) => role.name).join(', ')}
                                    </span>
                                    <span className='d-flex align-items-center text-gray-400 mb-2'>
                                        <KTSVG
                                            path='/media/icons/duotune/communication/com011.svg'
                                            className='svg-icon-4 me-1'
                                        />
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export {UserShow}