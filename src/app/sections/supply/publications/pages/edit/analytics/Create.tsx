import React, {useEffect, useState} from 'react';
import {InputGroup} from 'react-bootstrap';
import {Field, Form, Formik} from 'formik';
import axios from 'axios';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {usePublication} from '../../../core/PublicationContext';
import {getPublicationAnalytics} from '../../../../../../requests/supply/publication/PublisherAnalytics';
import {PublicationAnalyticsColumns} from '../../../core/edit/analytics/TableColumns';
import {SelectCardAction} from '../../../../../../components/misc/CardAction';
import {ANALYTICS_TYPE, GEO_TYPE} from '../../../../../../models/supply/Options';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import {
    defaultPublicationAnalyticFormFields,
    PublicationAnalyticFormFields,
    PublicationAnalyticSchema
} from '../../../core/edit/analytics/form';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import {Country} from '../../../../../../models/misc/Country';
import {getAllCountries} from '../../../../../../requests/misc/Country';
import {extractErrors} from '../../../../../../helpers/requests';
import {GenericErrorMessage, genericSingleSelectOnChangeHandler} from '../../../../../../helpers/form';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {Region} from '../../../../../../models/misc/Region';
import {getAllRegions} from '../../../../../../requests/misc/Region';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import {Device} from '../../../../../../models/misc/Device';
import {getAllDevices} from '../../../../../../requests/misc/Device';


const PublicationAnalyticCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationAnalyticFormFields>(defaultPublicationAnalyticFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);

    const [analyticsTypes, setAnalyticsType] = useState<Object[]>([
        {id: 1, name: ANALYTICS_TYPE.UNIQUE_USERS},
        {id: 2, name: ANALYTICS_TYPE.PAGE_VIEWS},
        {id: 3, name: ANALYTICS_TYPE.AVERAGE_SESSIONS_DURATION},
        {id: 4, name: ANALYTICS_TYPE.BOUNCE_RATE}]);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get publication analytics types options
            // TODO

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
    }, [publication]);

    const selectChangeHandler = (e: any, key: string) => {
        if (key === 'type') {
            setForm({...form, [key]: e.name})
        } else {
            genericSingleSelectOnChangeHandler(e, form, setForm, key);
        }
    };


    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        // genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publication) {
            console.log(form)
            // send API request to create the publication analytics
            // storePublicationAnalytic(publication, form).then(response => {
            //         if (axios.isAxiosError(response)) {
            //             // we need to show the errors
            //             setFormErrors(extractErrors(response));
            //         } else if (response === undefined) {
            //             // show generic error message
            //             setFormErrors([GenericErrorMessage])
            //         } else {
            //             // we were able to store the publisher payments
            //             krysApp.setAlert({
            //                 message: new AlertMessageGenerator('publication google analytics data', Actions.CREATE, KrysToastType.SUCCESS).message,
            //                 type: KrysToastType.SUCCESS
            //             });
            //
            //             // now that we have a new record successfully we need to refresh the table
            //             setRefreshTable(true);
            //
            //             // we need to clear the form data
            //             // setForm(defaultPublicationAnalyticFormFields);
            //
            //             // we need to clear the form data
            //             setFormErrors([]);
            //         }
            //     }
            // );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Analytic"
                          actions={[new SelectCardAction('manage-supply', analyticsTypes, 'Select analytics type', selectChangeHandler, 'type', {
                              id: 1,
                              name: ANALYTICS_TYPE.UNIQUE_USERS
                          })]}/>

            <KTCardBody>
                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">New Analytics Record Creation Form</span>
                    <span className="text-muted">This form allows you to create a new analytics record. You will need to provide the following information:
                    </span>
                </div>

                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={PublicationAnalyticSchema} onSubmit={handleCreate}
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

                                        <Select name="geo_id"
                                                menuPlacement={'top'}
                                                options={regions}
                                                getOptionLabel={(region) => region?.name}
                                                getOptionValue={(region) => region?.id.toString()}
                                                onChange={(e) => {
                                                    selectChangeHandler(e, 'geo_id')
                                                }}
                                                placeholder="Select a region"
                                                isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                {
                                    form.geo_type === GEO_TYPE.COUNTRY &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Country" isRequired={true}/>

                                        <Select name="geo_id"
                                                menuPlacement={'top'}
                                                options={countries}
                                                getOptionLabel={(country) => country?.name}
                                                getOptionValue={(country) => country?.id.toString()}
                                                onChange={(e) => {
                                                    selectChangeHandler(e, 'geo_id')
                                                }}
                                                placeholder="Select a country"
                                                isClearable={true}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_id ? errors?.geo_id : null}
                                        </div>
                                    </div>
                                }

                                <div className="mb-7">
                                    <KrysFormLabel text="Device" isRequired={false}/>

                                    <Select name="device_id"
                                            menuPlacement={'top'}
                                            options={devices}
                                            getOptionLabel={(device) => device?.name}
                                            getOptionValue={(device) => device?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'device_id')
                                            }}
                                            placeholder="Select a device"
                                            isClearable={true}/>

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

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                <h5 className="fs-5 text-gray-700 d-flex fw-medium">{form.type}</h5>

                {
                    publication &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publication-analytics"
                        queryId={QUERIES.PUBLICATIONS_ANALYTICS_LIST}
                        requestFunction={getPublicationAnalytics}
                        requestId={publication.id}
                        columnsArray={PublicationAnalyticsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationAnalyticCreate;