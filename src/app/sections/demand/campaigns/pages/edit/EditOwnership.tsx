import React from 'react';
import {Campaign} from '../../../../../models/demand/Campaign';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {AdvertiserContactsSchema} from '../../../advertisers/core/edit/contacts/form';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';

interface Props {
    campaign: Campaign | null
}

const EditOwnership: React.FC<Props> = ({campaign}) => {
    return ( <></>
        // <KTCard>
        //     <KTCardHeader text="Edit Advertiser Contact" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>
        //
        //     <KTCardBody>
        //         <FormErrors errorMessages={formErrors}/>
        //
        //         <Formik initialValues={form} validationSchema={AdvertiserContactsSchema} onSubmit={handleEdit}
        //                 enableReinitialize>
        //             {
        //                 (formik) => (
        //                     <Form onChange={onChangeHandler}>
        //                         <div className="mb-7">
        //                             <KrysFormLabel text="Contact person name" isRequired={false}/>
        //
        //                             <Field className="form-control fs-base" type="text"
        //                                    placeholder="Enter full name of contact person" name="contact_name"/>
        //
        //                             <div className="mt-1 text-danger">
        //                                 <ErrorMessage name="contact_name" className="mt-2"/>
        //                             </div>
        //                         </div>
        //
        //                         <div className="mb-7">
        //                             <KrysFormLabel text="Agency name" isRequired={false}/>
        //
        //                             <Field className="form-control fs-base" type="text"
        //                                    placeholder="Enter agency name" name="agency_name"/>
        //
        //                             <div className="mt-1 text-danger">
        //                                 <ErrorMessage name="agency_name" className="mt-2"/>
        //                             </div>
        //                         </div>
        //
        //                         <div className="mb-7">
        //                             <KrysFormLabel text="Contact information" isRequired={true}/>
        //
        //                             <Field className="form-control fs-base" type="text"
        //                                    placeholder="E.g. email address, phone number, physical address"
        //                                    name="contact_info"/>
        //
        //                             <div className="mt-1 text-danger">
        //                                 <ErrorMessage name="contact_info" className="mt-2"/>
        //                             </div>
        //                         </div>
        //
        //                         <KrysFormFooter cancelUrl={`/demand/advertisers/${advertiser?.id}/edit`}/>
        //                     </Form>
        //                 )
        //             }
        //         </Formik>
        //     </KTCardBody>
        // </KTCard>
    );
};

export default EditOwnership;