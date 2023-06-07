import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import MultiSelect from '../../../../../components/forms/MultiSelect';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {genericHandleSingleFile, genericOnChangeHandler} from '../../../../../helpers/form';
import {submitRequest} from '../../../../../helpers/requests';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {Role} from '../../../../../models/iam/Role';
import {User} from '../../../../../models/iam/User';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {getAllRoles} from '../../../../../requests/iam/Role';
import {updateUser} from '../../../../../requests/iam/User';
import {defaultFormFields, EditUserSchema, FormFields} from '../../core/form';

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
            submitRequest(getAllRoles, [], (response) => {
                setRoles(response);
            }, setFormErrors);
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
        if (user) {
            // send API request to create the user
            submitRequest(updateUser, [user.id, form], (response) => {
                // we were able to store the user
                krysApp.setAlert({
                    message: new AlertMessageGenerator('user', Actions.EDIT, KrysToastType.SUCCESS).message,
                    type: KrysToastType.SUCCESS
                });
            }, setFormErrors);
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

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Email address" isRequired={true}/>

                                    <Field className="form-control fs-base" type="email"
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

                                    <Field className="form-control fs-base" type="file" name="image" value={undefined}
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