import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Advertiser} from '../../../../../models/demand/Advertiser';
import {defaultUpdateInfoFormFields, UpdateAdvertiserSchema, UpdateInfoFormFields} from '../../core/form';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../helpers/form';
import {updateAdvertiser} from '../../../../../requests/demand/Advertiser';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';

interface Props {
    advertiser: Advertiser | null
}

const AdvertiserInfoEdit: React.FC<Props> = ({advertiser}) => {
    const [form, setForm] = useState<UpdateInfoFormFields>(defaultUpdateInfoFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

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
        <KTCard className='card-bordered border-1'>
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

export default AdvertiserInfoEdit;