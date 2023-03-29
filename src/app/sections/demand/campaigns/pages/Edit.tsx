import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {Campaign} from '../../../../models/demand/Campaign';
import {getCampaign, updateCampaign} from '../../../../requests/demand/Campaign';
import {extractErrors} from '../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
// import {defaultFormFields, CampaignSchema, FormFields} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
// import {AlertMessageGenerator} from "../../../../helpers/alertMessageGenerator";
import {Sections} from "../../../../helpers/sections";

import Creatable, {useCreatable} from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

const CampaignEdit: React.FC = () => {
    // const [form, setForm] = useState<FormFields>(defaultFormFields);
    // const [formErrors, setFormErrors] = useState<string[]>([]);
    //
    // const [campaign, setCampaign] = useState<Campaign | null>(null);
    //
    // const krysApp = useKrysApp();
    //
    // let {id} = useParams();
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (id) {
    //         // get the campaign we need to edit from the database
    //         getCampaign(parseInt(id)).then(response => {
    //             if (axios.isAxiosError(response)) {
    //                 // we were not able to fetch the campaign to edit so we need to redirect
    //                 // to error page
    //                 navigate('/error/404');
    //             } else if (response === undefined) {
    //                 // unknown error occurred
    //                 navigate('/error/400');
    //             } else {
    //                 // ... add code to set the API response to form object or manipulate it
    //                 // before you update the form object
    //             }
    //         });
    //
    //         // ... get any API data you may need to fill the form
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id]);
    //
    // useEffect(() => {
    //     // when we're here it means our campaign object is loaded from the API
    //     if (campaign) {
    //         krysApp.setPageTitle(generatePageTitle(Sections.TODO, PageTypes.EDIT, campaign.name))
    //     }
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [campaign]);
    //
    // const onChangeHandler = (e: any) => {
    //     // in case of multi select, the element doesn't have a name because
    //     // we get only a list of values from the select and not an element with target value and name
    //
    //     // TODO update the code here if you want some fields to not be handled by default onchange handler
    //     if (e.target.name !== 'image') {
    //         genericOnChangeHandler(e, form, setForm);
    //     }
    // };
    //
    // const handleEdit = (e: any) => {
    //     // send API request to create the campaign
    //     updateCampaign(form).then(response => {
    //             if (axios.isAxiosError(response)) {
    //                 // we need to show the errors
    //                 setFormErrors(extractErrors(response));
    //             } else if (response === undefined) {
    //                 // show generic error message
    //                 setFormErrors([GenericErrorMessage])
    //             } else {
    //                 // we were able to store the campaign
    //                 krysApp.setAlert({
    //                     message: new AlertMessageGenerator('campaign', Actions.EDIT, KrysToastType.SUCCESS).message,
    //                     type: KrysToastType.SUCCESS
    //                 });
    //
    //                 navigate(`TODO`);
    //             }
    //         }
    //     );
    // };

    const colourOptions = [
        {
            name: 'option 1',
            id: '1'
        },
        {
            name: 'option 2',
            id: '2'
        },
        {
            name: 'option 3',
            id: '3'
        }
    ];

    return (<>
            <CreatableSelect isMulti
                             options={colourOptions.map((objective) => ({
                                 value: objective.id.toString(),
                                 label: objective.name,
                             }))}
            />

        </>
        // <KTCard>
        //     <KTCardHeader text="Edit Campaign" icon="fa-solid fa-pencil" icon_style="fs-3 text-warning"/>
        //
        //     <KTCardBody>
        //         <FormErrors errorMessages={formErrors}/>
        //
        //         <Formik initialValues={form} validationSchema={CampaignSchema} onSubmit={handleEdit}
        //                 enableReinitialize>
        //             {
        //                 (formik) => (
        //                     <Form onChange={onChangeHandler}>
        //                         <div className="mb-7">
        //                             <KrysFormLabel text="Name" isRequired={true}/>
        //
        //                             <Field className="form-control fs-6" type="text"
        //                                    placeholder="Enter full name" name="name"/>
        //
        //                             <div className="mt-1 text-danger">
        //                                 <ErrorMessage name="name" className="mt-2"/>
        //                             </div>
        //                         </div>
        //
        //                         <KrysFormFooter cancelUrl={'TODO'}/>
        //                     </Form>
        //                 )
        //             }
        //         </Formik>
        //     </KTCardBody>
        // </KTCard>
    );
};

export default CampaignEdit;