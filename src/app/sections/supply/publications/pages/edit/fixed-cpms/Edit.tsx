import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {GenericErrorMessage, genericOnChangeHandler} from '../../../../../../helpers/form';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {extractErrors} from '../../../../../../helpers/requests';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {PublicationFixedCpm} from '../../../../../../models/supply/publication/PublicationFixedCpm';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {
    getPublicationFixedCpm,
    updatePublicationFixedCpm
} from '../../../../../../requests/supply/publication/PublisherFixedCpm';
import {
    defaultPublicationFixedCpmEditFormFields,
    fillEditForm,
    PublicationFixedCpmEditFormFields,
    publicationFixedCpmSchema
} from '../../../core/edit/fixed-cpms/form';
import {usePublication} from '../../../core/PublicationContext';
import {usePublicationEdit} from '../../../core/PublicationEditContext';

const PublicationFixedCpmEdit: React.FC = () => {
    const {cid} = useParams();

    const {options} = usePublication();
    const {publication, editOptions} = usePublicationEdit();
    const krysApp = useKrysApp();

    const navigate = useNavigate();

    const [form, setForm] = useState<PublicationFixedCpmEditFormFields>(defaultPublicationFixedCpmEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [publicationFixedCpm, setPublicationFixedCpm] = useState<PublicationFixedCpm | null>(null);

    const {formats, regions, countries} = options;
    const {currencies} = editOptions;

    useEffect(() => {
        if (publication && cid) {
            // get the publication fixed cpm we need to edit from the database
            getPublicationFixedCpm(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publication fixed cpm to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication fixed cpm to edit
                    setPublicationFixedCpm(response);
                    // we also set the form to be the publication's fixed cpm details
                    setForm(fillEditForm(response));
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationFixedCpm) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_FIXED_CPM, PageTypes.EDIT, `${publication?.name}'s fixed CPM`))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationFixedCpm]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationFixedCpm) {
            // we need to update the fixed cpm data by doing API call with form
            updatePublicationFixedCpm(publication, publicationFixedCpm.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication fixed cpm so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication fixed cpm', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Fixed CPM (NET)"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationFixedCpmSchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysRadioButton name="geo_type" label={'Regions'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             geo_type: GEO_TYPE.REGION,
                                                             geo_id: 0
                                                         });
                                                     }}
                                                     defaultValue={form.geo_type === GEO_TYPE.REGION}/>

                                    <KrysRadioButton name="geo_type" label={'Countries'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             geo_type: GEO_TYPE.COUNTRY,
                                                             geo_id: 0
                                                         });
                                                     }}
                                                     defaultValue={form.geo_type === GEO_TYPE.COUNTRY}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.geo_type ? errors?.geo_type : null}
                                    </div>
                                </div>

                                {
                                    form.geo_type === GEO_TYPE.REGION &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Region" isRequired={true}/>

                                        <SingleSelect isResourceLoaded={isResourceLoaded} options={regions}
                                                      defaultValue={publicationFixedCpm?.geo} form={form}
                                                      setForm={setForm} name="geo_id" isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                {
                                    form.geo_type === GEO_TYPE.COUNTRY &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Country" isRequired={true}/>

                                        <SingleSelect isResourceLoaded={isResourceLoaded} options={countries}
                                                      defaultValue={publicationFixedCpm?.geo} form={form}
                                                      setForm={setForm} name="geo_id" isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Formats" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={formats}
                                                  defaultValue={publicationFixedCpm?.format} form={form}
                                                  setForm={setForm} name="format_id" isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.format_id ? errors?.format_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Price" isRequired={true}/>

                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter the price"
                                           name="price"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.price ? errors?.price : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Currency" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={currencies}
                                                  defaultValue={publicationFixedCpm?.currency} form={form}
                                                  setForm={setForm} name="currency_id" label="currency"
                                                  isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.currency_id ? errors?.currency_id : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={`/supply/publications/${publication?.id}/edit`}/>
                            </Form>
                        )}
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PublicationFixedCpmEdit;