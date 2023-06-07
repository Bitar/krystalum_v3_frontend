import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {CampaignRestrictionRequirement} from '../../../../models/misc/CampaignRestrictionRequirement';

import {useKrysApp} from '../../../../modules/general/KrysApp';
import {
    getCampaignRestrictionRequirement,
    updateCampaignRestrictionRequirement
} from '../../../../requests/misc/CampaignRestrictionRequirement';
import {CampaignRestrictionRequirementSchema, defaultFormFields, FormFields} from '../core/form';


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
            submitRequest(getCampaignRestrictionRequirement, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
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
        if (campaignRestriction) {
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
            submitRequest(updateCampaignRestrictionRequirement, [campaignRestriction.id, form], (response) => {
                // we got the updated campaign restriction requirement so we're good
                krysApp.setAlert({
                    message: new AlertMessageGenerator('campaign restriction requirement', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });

                navigate(`/misc/campaign-restriction-requirements`);
            }, setFormErrors);
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

                                    <Field className="form-control fs-base" type="text"
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