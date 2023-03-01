import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {generateSuccessMessage} from '../../../../helpers/alerts';
import {Sections} from '../../../../helpers/sections';
import {CampaignType, defaultCampaignType} from '../../../../models/misc/CampaignType';
import {getCampaignType, updateCampaignType} from '../../../../requests/misc/CampaignType';
import {CampaignTypeSchema} from '../core/form';


const CampaignTypeEdit: React.FC = () => {
    const [campaignType, setCampaignType] = useState<CampaignType>(defaultCampaignType);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the campaign type we need to edit from the database
            getCampaignType(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the campaign type to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current campaign type to edit
                    setCampaignType(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_TYPES, PageTypes.EDIT, campaignType.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignType]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, campaignType, setCampaignType);
    };

    const handleEdit = (e: any) => {
        // we need to update the campaign type's data by doing API call with form
        updateCampaignType(campaignType).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the campaign type so we're good
                krysApp.setAlert({message: generateSuccessMessage('campaign type', Actions.EDIT), type: 'success'})
                navigate(`/misc/campaign-types`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Campaign Type" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={campaignType} validationSchema={CampaignTypeSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter campaign type name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true} />

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter campaign type code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/campaign-types'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CampaignTypeEdit;
