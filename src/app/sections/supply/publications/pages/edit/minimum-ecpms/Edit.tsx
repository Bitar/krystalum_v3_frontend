import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';

import {usePublication} from '../../../core/PublicationContext';
import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../../helpers/sections';
import {Actions, KrysToastType, PageTypes} from '../../../../../../helpers/variables';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../../../helpers/form';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {PublicationMinimumEcpm} from '../../../../../../models/supply/publication/PublicationMinimumEcpm';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import {Region} from '../../../../../../models/misc/Region';
import {Country} from '../../../../../../models/misc/Country';
import {getAllRegions} from '../../../../../../requests/misc/Region';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {getAllCountries, getAllCurrencies} from '../../../../../../requests/misc/Country';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {
    defaultPublicationMinimumEcpmEditFormFields,
    fillEditForm, PublicationMinimumEcpmEditFormFields,
    publicationMinimumEcpmSchema
} from '../../../core/edit/minimum-ecpms/form';
import {Format} from '../../../../../../models/misc/Format';
import {Currency} from '../../../../../../models/misc/Currency';
import {getAllFormats} from '../../../../../../requests/misc/Format';
import {
    getPublicationMinimumEcpm,
    updatePublicationMinimumEcpm
} from '../../../../../../requests/supply/publication/PublisherMinimumEcpm';

const PublicationMinimumEcpmEdit: React.FC = () => {
    const {publication} = usePublication();
    // get the publication and publication minimum ecpm id
    const {cid} = useParams();

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    const [publicationMinimumEcpm, setPublicationMinimumEcpm] = useState<PublicationMinimumEcpm | null>(null);
    const [form, setForm] = useState<PublicationMinimumEcpmEditFormFields>(defaultPublicationMinimumEcpmEditFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [formats, setFormats] = useState<Format[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        if (publication && cid) {
            // get the publication minimum ecpm we need to edit from the database
            getPublicationMinimumEcpm(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the publication minimum ecpm to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication minimum ecpm to edit
                    setPublicationMinimumEcpm(response);
                    // we also set the form to be the publication's minimum ecpm details
                    setForm(fillEditForm(response));
                }
            });

            // get the formats
            getAllFormats().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of formats, then we fill our state with them
                    if (response.data) {
                        setFormats(response.data);
                    }
                }
            });

            // get the regions
            getAllRegions().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of regions, then we fill our state with them
                    if (response.data) {
                        setRegions(filterData(response.data, 'name', ['All Regions', 'Rest of the world']));
                    }
                }
            });

            // get the countries
            getAllCountries().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of countries, then we fill our state with them
                    if (response.data) {
                        setCountries(filterData(response.data, 'name', ['All Countries']));
                    }
                }
            });

            // get the currencies
            getAllCurrencies().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of currencies, then we fill our state with them
                    if (response.data) {
                        setCurrencies(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationMinimumEcpm) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_FIXED_CPM, PageTypes.EDIT, publicationMinimumEcpm.format?.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationMinimumEcpm]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationMinimumEcpm) {
            // we need to update the minimum ecpm data by doing API call with form
            updatePublicationMinimumEcpm(publication, publicationMinimumEcpm.id, form).then(response => {
                if (axios.isAxiosError(response)) {
                    // show errors
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    // show generic error
                    setFormErrors([GenericErrorMessage]);
                } else {
                    // we got the updated publication minimum ecpm so we're good
                    krysApp.setAlert({
                        message: new AlertMessageGenerator('publication minimum ecpm', Actions.EDIT, KrysToastType.SUCCESS).message,
                        type: KrysToastType.SUCCESS
                    })

                    navigate(`/supply/publications/${publication.id}/edit`);
                }
            });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Minimum ECPM (NET)"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationMinimumEcpmSchema(true)} onSubmit={handleEdit}
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
                                                      defaultValue={publicationMinimumEcpm?.geo} form={form}
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
                                                      defaultValue={publicationMinimumEcpm?.geo} form={form}
                                                      setForm={setForm} name="geo_id" isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Formats" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={formats}
                                                  defaultValue={publicationMinimumEcpm?.format} form={form}
                                                  setForm={setForm} name="format_id" isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.format_id ? errors?.format_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Rate" isRequired={true}/>

                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter the rate"
                                           name="rate"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.rate ? errors?.rate : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Currency" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={currencies}
                                                  defaultValue={publicationMinimumEcpm?.currency} form={form}
                                                  setForm={setForm} name="currency_id" isClearable={true}/>

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

export default PublicationMinimumEcpmEdit;