import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from "react-select";
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import {indentOptions} from '../../../../components/forms/IndentOptions';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler, genericSingleSelectOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {Vertical} from "../../../../models/misc/Vertical";
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {getAllVerticals, storeVertical} from '../../../../requests/misc/Vertical';
import {defaultFormFields, FormFields, VerticalSchema} from '../core/form';


const VerticalCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const navigate = useNavigate();
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.CREATE))

        submitRequest(getAllVerticals, [], (response) => {
            setVerticals(response);
        }, setFormErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the vertical
        submitRequest(storeVertical, [form], (response) => {
            // it's vertical for sure
            krysApp.setAlert({
                message: new AlertMessageGenerator('vertical', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            navigate(`/misc/verticals`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Vertical"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={VerticalSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter vertical name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Vertical Parent" isRequired={false}/>

                                    <Select name="parent_id"
                                            options={verticals}
                                            getOptionLabel={(vertical) => vertical.name}
                                            getOptionValue={(vertical) => vertical.id.toString()}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'parent_id')}
                                            formatOptionLabel={indentOptions}
                                            isClearable={true}/>

                                    <div className="mt-3 text-danger">
                                        {errors?.parent_id ? errors?.parent_id : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/misc/verticals'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default VerticalCreate;