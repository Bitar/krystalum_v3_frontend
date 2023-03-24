import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import MultiSelect from '../../../../../components/forms/MultiSelect';
import {defaultFormFields, EditUserSchema, FormFields} from '../../core/form';
import {User} from '../../../../../models/iam/User';
import {Role} from '../../../../../models/iam/Role';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {updateUser} from '../../../../../requests/iam/User';
import axios from 'axios';
import {getAllRoles} from '../../../../../requests/iam/Role';
import {extractErrors} from '../../../../../helpers/requests';
import {GenericErrorMessage, genericHandleSingleFile, genericOnChangeHandler} from '../../../../../helpers/form';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import FormErrors from '../../../../../components/forms/FormErrors';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';

interface Props {
    user: User | null
}

const EditProfile: React.FC<Props> = ({user}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);

    const [roles, setRoles] = useState<Role[]>([]);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (user) {
            setIsResourceLoaded(true);

            const {image, roles, ...currentUser} = user

            // was able to get the user we want to edit
            // the form is the same as user but without the image
            setForm({...currentUser, roles: user.roles.map((role: { id: any; }) => role.id)});

            // get the roles so we can edit the user's roles
            getAllRoles().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of roles, then we fill our state with them
                    if (response.data) {
                        setRoles(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        if (e.target.name !== 'image') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const handleFile = (e: any, formik: FormikProps<any>) => {
        genericHandleSingleFile(e, formik, form, setForm, 'image');
    };

    const handleEdit = (e: any) => {
        if(user) {
            // send API request to create the user
            updateUser(user.id, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the user
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('user', Actions.EDIT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });
                    }
                }
            );
        }
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={EditUserSchema} onSubmit={handleEdit}
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

                                <div className="mb-7">
                                    <KrysFormLabel text="Email address" isRequired={true}/>

                                    <Field className="form-control fs-6" type="email"
                                           placeholder="Enter email address" name="email"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="email" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Profile picture" isRequired={false}/>

                                    <div className="mb-3">
                                        {
                                            user?.image && <img src={user?.image} className="w-25"
                                                                alt={`${user?.name} profile`}/>
                                        }
                                    </div>

                                    <Field className="form-control fs-6" type="file" name="image" value={undefined}
                                           onChange={(e: any) => handleFile(e, formik)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Roles" isRequired={true}/>

                                    <MultiSelect isResourceLoaded={isResourceLoaded} options={roles}
                                                 defaultValue={user?.roles} form={form} setForm={setForm}
                                                 name={'roles'}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="roles" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/iam/users'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default EditProfile;