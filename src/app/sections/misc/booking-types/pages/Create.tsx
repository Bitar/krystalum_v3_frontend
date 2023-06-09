import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {storeBookingType} from '../../../../requests/misc/BookingType';
import {BookingTypeSchema, defaultFormFields, FormFields} from '../core/form';

const BookingTypeCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BOOKING_TYPES, PageTypes.CREATE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the booking type
        submitRequest(storeBookingType, [form], (response) => {
            // it's booking type for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('booking type', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/booking-types`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Booking Type"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={BookingTypeSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter booking type name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter booking type code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/booking-types'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BookingTypeCreate;