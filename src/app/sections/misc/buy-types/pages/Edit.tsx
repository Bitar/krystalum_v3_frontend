import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
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
import {BuyType, defaultBuyType} from '../../../../models/misc/BuyType';
import {getBuyType, updateBuyType} from '../../../../requests/misc/BuyType';


const BuyTypeEdit: React.FC = () => {
    const [buyType, setBuyType] = useState<BuyType>(defaultBuyType);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the buy type we need to edit from the database
            getBuyType(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the buy type to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current buy type to edit
                    setBuyType(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUY_TYPES, PageTypes.EDIT, buyType.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyType]);

    const EditBuyTypeSchema = Yup.object().shape({
        name: Yup.string().required(),
        code: Yup.string().required(),
    });

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, buyType, setBuyType);
    };

    const handleEdit = (e: any) => {
        // we need to update the buy type's data by doing API call with form
        updateBuyType(buyType).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the updated buy type so we're good
                krysApp.setAlert({message: generateSuccessMessage('buy type', Actions.EDIT), type: 'success'})
                navigate(`/misc/buy-types`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Buy Type" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={buyType} validationSchema={EditBuyTypeSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter buy type name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter buy type code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/buy-types'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BuyTypeEdit;
