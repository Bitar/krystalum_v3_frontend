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
import {BuyingModel, defaultBuyingModel} from '../../../../models/misc/BuyingModel';
import {getBuyingModel, updateBuyingModel} from '../../../../requests/misc/BuyingModel';
import {BuyingModelSchema} from '../core/form';


const BuyingModelEdit: React.FC = () => {
    const [buyingModel, setBuyingModel] = useState<BuyingModel>(defaultBuyingModel);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the buying model we need to edit from the database
            getBuyingModel(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the buying model to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current buying model to edit
                    setBuyingModel(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUYING_MODELS, PageTypes.EDIT, buyingModel.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyingModel]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, buyingModel, setBuyingModel);
    };

    const handleEdit = (e: any) => {
        // we need to update the buying model's data by doing API call with form
        updateBuyingModel(buyingModel).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the buying model so we're good
                krysApp.setAlert({message: generateSuccessMessage('buying model', Actions.EDIT), type: 'success'})
                navigate(`/misc/buying-models`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Buying Model" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={buyingModel} validationSchema={BuyingModelSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter buying model name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/buying-models'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BuyingModelEdit;