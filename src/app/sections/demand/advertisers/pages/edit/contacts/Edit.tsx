import React, {useEffect, useState} from 'react';
import {AdvertiserContact} from '../../../../../../models/demand/Advertiser';
import {
    AdvertiserContactsFormFields,
    AdvertiserContactsSchema,
    defaultAdvertiserContactsFormFields
} from '../../../core/edit/contacts/form';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import {genericOnChangeHandler} from '../../../../../../helpers/form';
import {PageTypes} from '../../../../../../helpers/variables';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../../helpers/sections';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {useAdvertiser} from '../../../core/AdvertiserContext';
import {useParams} from 'react-router-dom';
import {getPermission} from '../../../../../../requests/iam/Permission';
import axios from 'axios';
import {getAdvertiserContact} from '../../../../../../requests/demand/AdvertiserContact';

const AdvertiserContactEdit: React.FC = () => {
    const {advertiser} = useAdvertiser();

    console.log(advertiser);

    const [advertiserContact, setAdvertiserContact] = useState<AdvertiserContact | null>(null);

    const [form, setForm] = useState<AdvertiserContactsFormFields>(defaultAdvertiserContactsFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const krysApp = useKrysApp();

    // get the advertiser and advertiser contact id
    let {id, cid} = useParams();

    useEffect(() => {
        if (id && cid) {
            // get the permission we need to edit from the database
            // getAdvertiserContact(parseInt(id)).then(response => {
            //     if (axios.isAxiosError(response)) {
            //         // we were not able to fetch the permission to edit so we need to redirect
            //         // to error page
            //         navigate('/error/404');
            //     } else if (response === undefined) {
            //         navigate('/error/400');
            //     } else {
            //         // we were able to fetch current permission to edit
            //         setPermission(response);
            //     }
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, cid]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    useEffect(() => {
        if(advertiserContact) {
            krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_ADVERTISER_CONTACT, PageTypes.EDIT, advertiserContact.contact_info))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advertiserContact]);

    const handleEdit = (e: any) => {
        // we need to update the permission's data by doing API call with form
        // updatePermission(permission.id, permission).then(response => {
        //     if (axios.isAxiosError(response)) {
        //         // show errors
        //         setFormErrors(extractErrors(response));
        //     } else if (response === undefined) {
        //         // show generic error
        //         setFormErrors([GenericErrorMessage]);
        //     } else {
        //         // we got the updated permission so we're good
        //         krysApp.setAlert({message: new AlertMessageGenerator('permission', Actions.EDIT, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
        //         navigate(`/iam/permissions`);
        //     }
        // });
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Advertiser Contact" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={AdvertiserContactsSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Contact person name" isRequired={false}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name of contact person" name="contact_name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="contact_name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Agency name" isRequired={false}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter agency name" name="agency_name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="agency_name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Contact information" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="E.g. email address, phone number, physical address"
                                           name="contact_info"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="contact_info" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={`/demand/advertisers/${advertiser?.id}/edit`}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )

};

export default AdvertiserContactEdit;