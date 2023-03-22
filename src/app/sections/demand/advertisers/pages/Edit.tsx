import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {Advertiser} from '../../../../models/demand/Advertiser';
import {getAdvertiser, updateAdvertiser} from '../../../../requests/demand/Advertiser';
import {extractErrors} from '../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {
    UpdateAdvertiserSchema,
    UpdateInfoFormFields, defaultUpdateInfoFormFields
} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {Sections} from "../../../../helpers/sections";

const AdvertiserEdit: React.FC = () => {
    const [form, setForm] = useState<UpdateInfoFormFields>(defaultUpdateInfoFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);

    const krysApp = useKrysApp();

    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the advertiser we need to edit from the database
            getAdvertiser(parseInt(id)).then(response => {
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

            // ... get any API data you may need to fill the form
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

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        if (e.target.name !== 'trade_license') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const handleEdit = (e: any) => {
        // send API request to create the advertiser
        updateAdvertiser(form).then(response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error message
                    setFormErrors([GenericErrorMessage])
                } else {
                    // we were able to store the advertiser
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('advertiser', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    });

                    navigate(`/demand/advertisers`);
                }
            }
        );
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Advertiser" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={UpdateAdvertiserSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/advertisers'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
};

export default AdvertiserEdit;