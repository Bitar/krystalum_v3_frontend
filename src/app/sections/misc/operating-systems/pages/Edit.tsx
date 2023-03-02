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
import {OperatingSystem, defaultOperatingSystem} from '../../../../models/misc/OperatingSystem';
import {getOperatingSystem, updateOperatingSystem} from '../../../../requests/misc/OperatingSystem';
import {OperatingSystemSchema} from '../core/form';


const OperatingSystemEdit: React.FC = () => {
    const [operatingSystem, setOperatingSystem] = useState<OperatingSystem>(defaultOperatingSystem);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the operating system we need to edit from the database
            getOperatingSystem(parseInt(id)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the operating system to edit, so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current operating system to edit
                    setOperatingSystem(response);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_OPERATING_SYSTEMS, PageTypes.EDIT, operatingSystem.name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operatingSystem]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, operatingSystem, setOperatingSystem);
    };

    const handleEdit = (e: any) => {
        // we need to update the operating system's data by doing API call with form
        updateOperatingSystem(operatingSystem).then(response => {
            if (axios.isAxiosError(response)) {
                // show errors
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                // show generic error
                setFormErrors([GenericErrorMessage]);
            } else {
                // we got the operating system so we're good
                krysApp.setAlert({message: generateSuccessMessage('operating system', Actions.EDIT), type: 'success'})
                navigate(`/misc/operating-systems`);
            }
        });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Operating System" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={operatingSystem} validationSchema={OperatingSystemSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter operating system name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/operating-systems'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default OperatingSystemEdit;
