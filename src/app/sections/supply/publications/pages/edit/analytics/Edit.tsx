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
    genericOnChangeHandler, genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {
    defaultPublicationAnalyticFormFields,
    PublicationAnalyticFormFields,
    PublicationAnalyticSchema
} from '../../../core/edit/analytics/form';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';
import {AnalyticType, defaultAnalyticsType, GEO_TYPE} from '../../../../../../models/supply/Options';
import {getPublicationAnalytic} from '../../../../../../requests/supply/publication/PublisherAnalytic';
import {getAnalyticsTypes} from '../../../../../../requests/supply/Options';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import Select from 'react-select';
import {InputGroup} from 'react-bootstrap';
import {Region} from '../../../../../../models/misc/Region';
import {Country} from '../../../../../../models/misc/Country';
import {Device} from '../../../../../../models/misc/Device';
import {getAllRegions} from '../../../../../../requests/misc/Region';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {getAllCountries} from '../../../../../../requests/misc/Country';
import {getAllDevices} from '../../../../../../requests/misc/Device';

const PublicationAnalyticEdit: React.FC = () => {
    const {publication} = usePublication();
    // get the publication and publication analytics id
    const {cid} = useParams();

    console.log(cid)
    console.log(publication)

    const krysApp = useKrysApp();
    const navigate = useNavigate();

    const [publicationAnalytic, setPublicationAnalytic] = useState<PublicationAnalytic | null>(null);
    const [form, setForm] = useState<PublicationAnalyticFormFields>(defaultPublicationAnalyticFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        if (publication && cid) {
            // get the publication analytics we need to edit from the database
            getPublicationAnalytic(publication, parseInt(cid)).then(response => {
                if (axios.isAxiosError(response)) {
                    // we were not able to fetch the advertiser analytics to edit so we need to redirect
                    // to error page
                    navigate('/error/404');
                } else if (response === undefined) {
                    navigate('/error/400');
                } else {
                    // we were able to fetch current publication analytics to edit
                    setPublicationAnalytic(response);

                    console.log(response)

                    // we also set the form to be the publication's analytics details
                    // const {analyticType, ...currentPublicationAnalytic} = response;
                    //
                    // setForm({...currentPublicationAnalytic, type: analyticType?.id});
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

            // get the devices
            getAllDevices().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of devices, then we fill our state with them
                    if (response.data) {
                        setDevices(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication, cid]);

    useEffect(() => {
        if (publicationAnalytic) {
            setIsResourceLoaded(true);

            krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATION_ANALYTICS, PageTypes.EDIT, publicationAnalytic.type?.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationAnalytic]);

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (publication && publicationAnalytic) {
            // we need to update the analytic's data by doing API call with form
            // updatePublicationAnalytic(publication, publicationAnalytic.id, form).then(response => {
            //     if (axios.isAxiosError(response)) {
            //         // show errors
            //         setFormErrors(extractErrors(response));
            //     } else if (response === undefined) {
            //         // show generic error
            //         setFormErrors([GenericErrorMessage]);
            //     } else {
            //         // we got the updated publication analytics so we're good
            //         krysApp.setAlert({
            //             message: new AlertMessageGenerator('publication analytics', Actions.EDIT, KrysToastType.SUCCESS).message,
            //             type: KrysToastType.SUCCESS
            //         })
            //
            //         navigate(`/supply/publications/${publication.id}/edit`);
            //     }
            // });
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Publication Analytic"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublicationAnalyticSchema} onSubmit={handleEdit}
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
                                                             geo_type: GEO_TYPE.REGION
                                                         });
                                                     }}
                                                     defaultValue={form.geo_type === GEO_TYPE.REGION}/>

                                    <KrysRadioButton name="geo_type" label={'Countries'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             geo_type: GEO_TYPE.COUNTRY
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
                                                      defaultValue={publicationAnalytic?.geo} form={form}
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
                                                      defaultValue={publicationAnalytic?.geo} form={form}
                                                      setForm={setForm} name="geo_id" isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Device" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={devices}
                                                  defaultValue={publicationAnalytic?.device} form={form}
                                                  setForm={setForm} name="device_id" isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.device_id ? errors?.device_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Value" isRequired={true}/>

                                    <InputGroup className="mb-3">
                                        <Field className="form-control fs-base" type="number"
                                               placeholder="Enter the value"
                                               name="value"/>
                                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                    </InputGroup>

                                    <div className="mt-1 text-danger">
                                        {errors?.value ? errors?.value : null}
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

export default PublicationAnalyticEdit;