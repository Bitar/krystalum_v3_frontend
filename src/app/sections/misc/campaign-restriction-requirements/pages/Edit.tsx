import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {defaultFormFields, FormFields, CampaignRestrictionRequirementSchema} from '../core/form';
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {
    getCampaignRestrictionRequirement,
    updateCampaignRestrictionRequirement
} from '../../../../requests/misc/CampaignRestrictionRequirement';
import {CampaignRestrictionRequirement} from '../../../../models/misc/CampaignRestrictionRequirement';


const CampaignRestrictionRequirementEdit: React.FC = () => {
    const [campaignRestriction, setCampaignRestriction] = useState<CampaignRestrictionRequirement | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the campaign restriction requirement we need to edit from the database
            getCampaignRestrictionRequirement(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the campaign restriction requirement to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current campaign restriction requirement to edit
                    setCampaignRestriction(response);
                    setForm(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(campaignRestriction) {
            krysApp.setPageTitle(generatePageTitle(Sections.MISC_CAMPAIGN_RESTRICTION_REQUIREMENTS, PageTypes.EDIT, campaignRestriction.name));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (campaignRestriction) {
            // we need to update the campaign restriction requirement's data by doing API call with form
            updateCampaignRestrictionRequirement(campaignRestriction.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated campaign restriction requirement so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('campaign restriction requirement', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/misc/campaign-restriction-requirements`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Campaign Restriction Requirement" icon="fa-solid fa-pencil"
                          icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CampaignRestrictionRequirementSchema}
                        onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter campaign restriction requirement name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/campaign-restriction-requirements'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CampaignRestrictionRequirementEdit;