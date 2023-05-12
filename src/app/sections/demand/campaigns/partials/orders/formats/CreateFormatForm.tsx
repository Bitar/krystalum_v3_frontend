import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Select from 'react-select';
import axios from 'axios';
import {DatePicker} from 'rsuite';
import {Col, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import FormErrors from '../../../../../../components/forms/FormErrors';
import {
    CampaignOrderSchema,
} from '../../../core/edit/orders/form';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import {
    genericDateOnChangeHandler,
    GenericErrorMessage, genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {extractErrors} from '../../../../../../helpers/requests';
import {getAllFormats, getFormat} from '../../../../../../requests/misc/Format';
import {Format} from '../../../../../../models/misc/Format';
import {useCampaign} from '../../../core/CampaignContext';
import {BuyTypeEnum} from '../../../../../../enums/BuyTypeEnum';
import {BuyingModelCondensed} from '../../../../../../models/misc/BuyingModel';
import {getBuyingModel} from '../../../../../../requests/misc/BuyingModel';
import {indentOptions} from '../../../../../../components/forms/IndentOptions';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {Country} from '../../../../../../models/misc/Country';
import {getAllCountries, getAllCurrencies} from '../../../../../../requests/misc/Country';
import SingleSelect from '../../../../../../components/forms/SingleSelect';
import {Region} from '../../../../../../models/misc/Region';
import {getAllRegions} from '../../../../../../requests/misc/Region';
import {City} from '../../../../../../models/misc/City';
import {getAllCities} from '../../../../../../requests/misc/City';
import MultiSelect from '../../../../../../components/forms/MultiSelect';
import {PerformanceMetricCondensedTitle} from '../../../../../../models/misc/PerformanceMetric';
import {getAllPerformanceMetrics} from '../../../../../../requests/misc/PerformanceMetric';
import FormatSplitRepeater from './FormatSplitRepeater';
import {defaultFormatSplitField, FormatSplitField} from '../../../core/edit/orders/formats/formatSplitField';
import {defaultFormatKpiField, FormatKpiField} from '../../../core/edit/orders/formats/formatKpiField';
import FormatKpiRepeater from './FormatKpiRepeater';
import {useCreateOrder} from '../../../core/edit/orders/CreateOrderContext';
import {Currency} from '../../../../../../models/misc/Currency';

interface Props {
    setHideFormatModal: Dispatch<SetStateAction<any>>
}

const CreateFormatForm: React.FC<Props> = ({setHideFormatModal}) => {
    const {campaign} = useCampaign();
    const {formatForm, setFormatForm} = useCreateOrder();

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isAlwaysOn, setIsAlwaysOn] = useState<boolean>(false);
    const [hasBuyingModels, setHasBuyingModels] = useState<boolean>(false);

    const [defaultSelectCities, setDefaultSelectedCities] = useState<City[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [buyingModels, setBuyingModels] = useState<BuyingModelCondensed[]>([]);
    const [isBuyingModelsLoaded, setIsBuyingModelsLoaded] = useState<boolean>(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [isCitiesLoaded, setIsCitiesLoaded] = useState<boolean>(false);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricCondensedTitle[]>([]);
    const [reloadTargetMetrics, setReloadTargetMetrics] = useState<boolean>(false);
    const [defaultPerformanceMetric, setDefaultPerformanceMetric] = useState<PerformanceMetricCondensedTitle | undefined>(undefined);

    const [formatSplits, setFormatSplits] = useState<FormatSplitField[]>([defaultFormatSplitField]);
    const [formatKpis, setFormatKpis] = useState<FormatKpiField[]>([defaultFormatKpiField]);

    useEffect(() => {
        if (campaign && campaign.buyType?.id === BuyTypeEnum.AO) {
            setIsAlwaysOn(true);
        }
    }, [campaign]);

    useEffect(() => {
        // get the booking types
        getAllFormats().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setFormats(filterData(response.data, 'name', ['All Formats']));
                }
            }
        });

        getAllCurrencies().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setCurrencies(response.data);
                }
            }
        });

        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setCountries(filterData(response.data, 'name', ['All Countries']));
                }
            }
        });

        getAllRegions().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setRegions(filterData(response.data, 'name', ['All Regions', 'Rest of the world']));
                }
            }
        });

        getAllPerformanceMetrics('title').then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    let metrics = response.data.map((metric) => ({id: metric.id, title: metric.title}));
                    metrics = metrics.filter((metric) => metric.title !== null);

                    setPerformanceMetrics(metrics);
                }
            }
        });
    }, []);

    const onChangeHandler = (e: any) => {
        // while we're editing the format form, we need to reset the hide modal variable to false
        setHideFormatModal(false);

        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // add here any fields you don't want the default handler to handle
        if (e.target.name !== 'kpi_target') {
            genericOnChangeHandler(e, formatForm, setFormatForm);
        }
    };

    const onChangeFormat = (e: any) => {
        setIsBuyingModelsLoaded(false);

        genericSingleSelectOnChangeHandler(e, formatForm, setFormatForm, 'format_id');
        setFormatForm({...formatForm, format_name: e.name});

        // get the buying models based on the selected format
        getFormat(e.id).then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response) {
                    if (response.has_buying_model === 1) {
                        setHasBuyingModels(true);
                    } else {
                        setHasBuyingModels(false);
                    }

                    let buyingModels = response.buyingModels.map((buyingModel) => ({
                        id: buyingModel.id,
                        name: buyingModel.name
                    }));

                    setBuyingModels(buyingModels);
                }
            }
        });
    }

    const onChangeCountries = (e: any) => {
        // when we change countries we need to update the cities select with the new cities list
        setIsCitiesLoaded(false);

        genericMultiSelectOnChangeHandler(e, formatForm, setFormatForm, 'countries_ids');

        if (e.length > 0) {
            setFormatForm({...formatForm, countries_names: e.map((entity: any) => entity.id)});
        } else {
            setFormatForm({...formatForm, countries_names: []});
        }

        let query = '';

        if (e.length > 0) {
            query = 'filter[countries]=' + e.map((entity: any) => entity.id).join(',');

            // get the cities and fill the select
            getAllCities(query).then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    if (response.data) {
                        setCities(response.data);

                        // filter the selected cities to remove from the selection the
                        // ones that are no longer in the list
                        let availableCities = response.data.map((city) => city.id);

                        setDefaultSelectedCities(defaultSelectCities.filter((option) => availableCities.includes(option.id)));
                    }
                }
            });
        } else {
            setCities([]);
            setDefaultSelectedCities([]);
        }
    }

    useEffect(() => {
        if (typeof formatForm.buying_model_id === 'number') {
            getBuyingModel(formatForm.buying_model_id).then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    if (response) {
                        setFormatForm({...formatForm, buying_model_name: response.name});

                        // if there's only one performance metric then we make the default selection
                        let buyingModelMetrics = response.performanceMetrics;

                        if (buyingModelMetrics.length === 1) {
                            // we can make a default selection
                            setDefaultPerformanceMetric({
                                id: buyingModelMetrics[0].id,
                                title: buyingModelMetrics[0].title
                            });
                        }
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatForm.buying_model_id]);

    useEffect(() => {
        if(formatForm.cities_ids) {
            if(formatForm.cities_ids.length > 0) {
                setFormatForm({...formatForm, cities_names: cities.filter((city) => formatForm.cities_ids?.includes(city.id)).map((city) => city.name)});
            } else {
                setFormatForm({...formatForm, cities_names: []});
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatForm.cities_ids])

    useEffect(() => {
        if (defaultPerformanceMetric !== undefined) {
            setReloadTargetMetrics(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultPerformanceMetric]);

    useEffect(() => {
        if (cities.length > 0) {
            setIsCitiesLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities]);

    useEffect(() => {
        if (buyingModels.length > 0) {
            setIsBuyingModelsLoaded(true);
            // when we change the buying models, we need to make the reload target metrics
            // false so that we can go back to setting it true when the user selects from
            // the new list of buying models
            setReloadTargetMetrics(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyingModels]);

    useEffect(() => {
        setFormatForm({...formatForm, splits: formatSplits});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatSplits]);

    useEffect(() => {
        setFormatForm({...formatForm, kpis: formatKpis});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatKpis]);

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, formatForm, setFormatForm, key);
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={formatForm} validationSchema={CampaignOrderSchema}
                    onSubmit={() => console.log("format form was submitted")}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form onChange={onChangeHandler}>
                            <div className='mb-4'>
                                <span className='fs-5 text-gray-700 d-flex fw-medium'>Essential information</span>
                                <span className='text-muted'>Enter the core details for the format</span>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Format" isRequired={true}/>

                                <Select name="format_id"
                                        options={formats}
                                        getOptionLabel={(formats) => formats.name}
                                        getOptionValue={(formats) => formats.id.toString()}
                                        placeholder='Choose format'
                                        formatOptionLabel={indentOptions}
                                        onChange={onChangeFormat}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.format_id ? formik.errors?.format_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format has buying models*/}
                                <KrysFormLabel text="Buying model" isRequired={hasBuyingModels}/>

                                <SingleSelect isResourceLoaded={isBuyingModelsLoaded} options={buyingModels}
                                              defaultValue={undefined} form={formatForm} setForm={setFormatForm}
                                              name='buying_model_id' isClearable={!hasBuyingModels}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.buying_model_id ? formik.errors?.buying_model_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format has buying models*/}
                                <KrysFormLabel text="Cost" isRequired={hasBuyingModels}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter cost for format" name="cost"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="cost" className="mt-2"/>
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format has buying models*/}
                                <KrysFormLabel text="Cost currency" isRequired={hasBuyingModels}/>

                                <Select name="cost_currency_id"
                                        defaultValue={{id: 236, currency: 'USD'}}
                                        options={currencies}
                                        getOptionLabel={(currency) => currency.currency}
                                        getOptionValue={(currency) => currency.id.toString()}
                                        placeholder='Choose currency for cost'
                                        isClearable={!hasBuyingModels}
                                        onChange={(e) => {
                                            genericSingleSelectOnChangeHandler(e, formatForm, setFormatForm, 'cost_currency_id');

                                            if(e) {
                                                setFormatForm({...formatForm, cost_currency_name: e.currency});
                                            }
                                        }}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.cost_currency_id ? formik.errors?.cost_currency_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Start date" isRequired={true}/>

                                <DatePicker name="start_date"
                                            className="krys-datepicker"
                                            oneTap={true}
                                            block
                                            isoWeek
                                            preventOverflow={false}
                                            placeholder="Select format start date"
                                            onChange={(date) => dateChangeHandler(date, 'start_date')}
                                />

                                <div className="mt-1 text-danger">
                                    {formik.errors?.start_date ? formik.errors?.start_date : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="End date" isRequired={!isAlwaysOn}/>

                                <DatePicker name="end_date"
                                            className="krys-datepicker"
                                            oneTap={true}
                                            block
                                            isoWeek
                                            preventOverflow={false}
                                            placeholder="Select format end date"
                                            onChange={(date) => dateChangeHandler(date, 'end_date')}
                                />

                                <div className="mt-1 text-danger">
                                    {formik.errors?.end_date ? formik.errors?.end_date : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Target regions" isRequired={false}/>

                                <Select isMulti name="regions_ids"
                                        options={regions}
                                        getOptionLabel={(region) => region.name}
                                        getOptionValue={(region) => region.id.toString()}
                                        onChange={(e) => {
                                            genericMultiSelectOnChangeHandler(e, formatForm, setFormatForm, 'regions_ids');

                                            if (e.length > 0) {
                                                setFormatForm({...formatForm, regions_names: e.map((entity: any) => entity.name)});
                                            } else {
                                                setFormatForm({...formatForm, regions_names: []});
                                            }
                                        }}
                                        placeholder='Select target regions'/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.regions_ids ? formik.errors?.regions_ids : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Target countries" isRequired={false}/>

                                <Select isMulti name="countries"
                                        options={countries}
                                        getOptionLabel={(country) => country.name}
                                        getOptionValue={(country) => country.id.toString()}
                                        onChange={onChangeCountries}
                                        placeholder='Select target countries'/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.countries_ids ? formik.errors?.countries_ids : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Target cities" isRequired={false}/>

                                <MultiSelect isResourceLoaded={isCitiesLoaded} options={cities}
                                             defaultValue={defaultSelectCities} form={formatForm}
                                             setForm={setFormatForm}
                                             name={'cities_ids'} setSelected={setDefaultSelectedCities}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.cities_ids ? formik.errors?.cities_ids : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format has buying models*/}
                                <KrysFormLabel text="Target metric" isRequired={hasBuyingModels}/>

                                <SingleSelect isResourceLoaded={reloadTargetMetrics} options={performanceMetrics}
                                              defaultValue={defaultPerformanceMetric} form={formatForm}
                                              setForm={setFormatForm}
                                              name='performance_metric_id' isClearable={!hasBuyingModels}
                                              label='title'/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.performance_metric_id ? formik.errors?.performance_metric_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Target metric quantity" isRequired={hasBuyingModels}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter target quantity for metric" name="target"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="target" className="mt-2"/>
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Booked amount for format" isRequired={true}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter booked amount for format" name="booked_amount"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="booked_amount" className="mt-2"/>
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Booked amount currency" isRequired={true}/>

                                <Select name="booked_currency_id"
                                        defaultValue={{id: 236, currency: 'USD'}}
                                        options={currencies}
                                        getOptionLabel={(currency) => currency.currency}
                                        getOptionValue={(currency) => currency.id.toString()}
                                        placeholder='Choose currency for booked amount'
                                        onChange={(e) => {
                                            genericSingleSelectOnChangeHandler(e, formatForm, setFormatForm, 'booked_currency_id');

                                            if(e) {
                                                setFormatForm({...formatForm, 'booked_currency_name': e.currency});
                                            }
                                        }}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.booked_currency_id ? formik.errors?.booked_currency_id : null}
                                </div>
                            </div>

                            <div className='mb-4 mt-10'>
                                <span className='fs-5 text-gray-700 d-flex fw-medium'>Detailed targeting</span>
                                <span className='text-muted'>Specify how the format will be split into different line items</span>
                            </div>

                            <div className="mb-7">
                                {
                                    formatSplits.map((formatSplitBy, index) =>
                                        <FormatSplitRepeater defaultValue={formatSplitBy} index={index}
                                                             setParentSplits={setFormatSplits}
                                                             parentSplits={formatSplits}
                                                             setParentFormErrors={setFormErrors}
                                                             key={`split-${index}`}/>)
                                }

                                <Row>
                                    <Col>
                                        <Button variant={'success'}
                                                onClick={() => setFormatSplits([...formatSplits, defaultFormatSplitField])}
                                                size={'sm'}>
                                            <i className={'fa-duotone fa-plus fs-6'}></i> Add split
                                        </Button>
                                    </Col>
                                </Row>
                            </div>

                            <div className='mb-4 mt-10'>
                                <span className='fs-5 text-gray-700 d-flex fw-medium'>Evaluating performance</span>
                                <span className='text-muted'>List the KPIs based on which the performance of the format should be measured</span>
                            </div>

                            <div className="mb-7">
                                {
                                    formatKpis.map((formatKpi, index) =>
                                        <FormatKpiRepeater defaultValue={formatKpi} index={index}
                                                           setParentKpis={setFormatKpis} parentKpis={formatKpis}
                                                           setParentFormErrors={setFormErrors} key={`kpi-${index}`}/>
                                    )
                                }

                                <Row>
                                    <Col>
                                        <Button variant={'success'}
                                                onClick={() => setFormatKpis([...formatKpis, defaultFormatKpiField])}
                                                size={'sm'}>
                                            <i className={'fa-duotone fa-plus fs-6'}></i> Add KPI
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default CreateFormatForm;