import axios from 'axios';
import {Field, Form, Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import {SelectCardAction} from '../../../../../../components/misc/CardAction';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {extractErrors} from '../../../../../../helpers/requests';
import {DEFAULT_ANALYTIC_TYPE} from '../../../../../../helpers/settings';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import {Country} from '../../../../../../models/misc/Country';
import {Device} from '../../../../../../models/misc/Device';
import {Region} from '../../../../../../models/misc/Region';
import {AnalyticType} from '../../../../../../models/supply/Options';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {getAllCountries} from '../../../../../../requests/misc/Country';
import {getAllDevices} from '../../../../../../requests/misc/Device';
import {getAllRegions} from '../../../../../../requests/misc/Region';
import {getAnalyticsTypes} from '../../../../../../requests/supply/Options';
import {
    getPublicationAnalytics,
    storePublicationAnalytic
} from '../../../../../../requests/supply/publication/PublisherAnalytic';
import {
    AnalyticsFilterFields,
    defaultAnalyticsFilterFields,
    defaultPublicationAnalyticFormFields,
    PublicationAnalyticFormFields,
    PublicationAnalyticSchema
} from '../../../core/edit/analytics/form';
import {PublicationAnalyticsColumns} from '../../../core/edit/analytics/TableColumns';
import {usePublication} from '../../../core/PublicationContext';


const PublicationAnalyticCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationAnalyticFormFields>(defaultPublicationAnalyticFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<AnalyticsFilterFields>(defaultAnalyticsFilterFields);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);

    const [analyticsTypes, setAnalyticsType] = useState<AnalyticType[]>([]);
    const [currentAnalyticTypeFormatted, setCurrentAnalyticTypeFormatted] = useState<string>(DEFAULT_ANALYTIC_TYPE.name);

    const geosSelectRef = useRef<any>(null);
    const devicesSelectRef = useRef<any>(null);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get publication analytics types options
            getAnalyticsTypes().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of analytics types, then we fill our state with them
                    if (response.data) {
                        setAnalyticsType(response.data);
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
        genericSingleSelectOnChangeHandler(e, form, setForm, key);

        if (key === 'type' && e) {
            const type = analyticsTypes.find(analyticsType => analyticsType.id === e.id);

            if (type) {
                setCurrentAnalyticTypeFormatted(type.name)
                setFilters({...filters, 'type': e.id})
            }

            // as long as we are updating the create form, we should set the table refresh to false
            setRefreshTable(true);
        }
    };


    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publication) {
            // send API request to create the publication analytics
            storePublicationAnalytic(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publisher analytics
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication google analytics data', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        geosSelectRef.current?.clearValue();
                        devicesSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublicationAnalyticFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Analytic"
                          actions={[new SelectCardAction('manage-supply', analyticsTypes, 'Select analytics type', selectChangeHandler, 'type', DEFAULT_ANALYTIC_TYPE)]}/>

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

                                        <Select name="geo_id"
                                                menuPlacement={'top'}
                                                options={regions}
                                                getOptionLabel={(region) => region?.name}
                                                getOptionValue={(region) => region?.id.toString()}
                                                onChange={(e) => {
                                                    selectChangeHandler(e, 'geo_id')
                                                }}
                                                placeholder="Select a region"
                                                isClearable={true}
                                                ref={geosSelectRef}/>

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
                                                isClearable={true}
                                                ref={geosSelectRef}/>

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
                                            isClearable={true}
                                            ref={devicesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.device_id ? errors?.device_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Value" isRequired={true}/>

                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter the value"
                                           name="value"/>

                                    <div className="mt-1 text-danger">
                                        {errors?.value ? errors?.value : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">{currentAnalyticTypeFormatted}</span>
                    <span
                        className="text-muted">This table displays a list of '{currentAnalyticTypeFormatted}' records:</span>
                </div>

                {
                    publication &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publication-analytics"
                        queryId={QUERIES.PUBLICATION_ANALYTICS_LIST}
                        requestFunction={getPublicationAnalytics}
                        requestId={publication.id}
                        columnsArray={PublicationAnalyticsColumns}
                        filters={filters}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationAnalyticCreate;