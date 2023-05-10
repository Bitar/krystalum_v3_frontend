import React, {useEffect, useState} from 'react';
import FormErrors from '../../../../../../../components/forms/FormErrors';
import {CampaignOrderFormFields, CampaignOrderSchema, defaultCampaignOrderFormFields} from '../form';
import KrysFormLabel from '../../../../../../../components/forms/KrysFormLabel';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {CampaignOrderFormatFormFields, defaultCampaignOrderFormatFormFields} from './form';
import {
    genericDateOnChangeHandler,
    GenericErrorMessage, genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../../helpers/form';
import Select from 'react-select';
import {generatePageTitle} from '../../../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../../../helpers/sections';
import {PageTypes} from '../../../../../../../helpers/variables';
import {getAllBookingTypes} from '../../../../../../../requests/misc/BookingType';
import axios from 'axios';
import {extractErrors} from '../../../../../../../helpers/requests';
import {getAllFormats, getFormat} from '../../../../../../../requests/misc/Format';
import {Format} from '../../../../../../../models/misc/Format';
import {useCampaign} from '../../../CampaignContext';
import {BuyTypeEnum} from '../../../../../../../enums/BuyTypeEnum';
import {BuyingModel, BuyingModelCondensed} from '../../../../../../../models/misc/BuyingModel';
import {getAllBuyingModels, getBuyingModel} from '../../../../../../../requests/misc/BuyingModel';
import {indentOptions} from '../../../../../../../components/forms/IndentOptions';
import {filterData} from '../../../../../../../helpers/dataManipulation';
import {Country} from '../../../../../../../models/misc/Country';
import {getAllCountries} from '../../../../../../../requests/misc/Country';
import SingleSelect from '../../../../../../../components/forms/SingleSelect';
import {DatePicker} from 'rsuite';
import {Region} from '../../../../../../../models/misc/Region';
import {getAllRegions} from '../../../../../../../requests/misc/Region';
import {City} from '../../../../../../../models/misc/City';
import {getAllCities} from '../../../../../../../requests/misc/City';
import MultiSelect from '../../../../../../../components/forms/MultiSelect';
import {PerformanceMetric, PerformanceMetricCondensedTitle} from '../../../../../../../models/misc/PerformanceMetric';
import {getAllPerformanceMetrics} from '../../../../../../../requests/misc/PerformanceMetric';

interface Props {
    onSubmit: any,

}

const CreateFormatForm: React.FC<Props> = ({onSubmit}) => {
    const {campaign} = useCampaign();

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isAlwaysOn, setIsAlwaysOn] = useState<boolean>(false);
    const [isYoutubeMasthead, setIsYoutubeMasthead] = useState<boolean>(false);

    const [form, setForm] = useState<CampaignOrderFormatFormFields>(defaultCampaignOrderFormatFormFields);
    const [defaultSelectCities, setDefaultSelectedCities] = useState<City[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [buyingModels, setBuyingModels] = useState<BuyingModelCondensed[]>([]);
    const [isBuyingModelsLoaded, setIsBuyingModelsLoaded] = useState<boolean>(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [isCitiesLoaded, setIsCitiesLoaded] = useState<boolean>(false);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricCondensedTitle[]>([]);
    const [reloadTargetMetrics, setReloadTargetMetrics] = useState<boolean>(false);
    const [defaultPerformanceMetric, setDefaultPerformanceMetric] = useState<PerformanceMetricCondensedTitle | undefined>(undefined);

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
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // add here any fields you don't want the default handler to handle
        genericOnChangeHandler(e, form, setForm);
    };

    const onChangeFormat = (e: any) => {
        setIsBuyingModelsLoaded(false);

        genericSingleSelectOnChangeHandler(e, form, setForm, 'format_id');

        // check if the format is youtube masthead
        if (e.name === 'Youtube Masthead') {
            setIsYoutubeMasthead(true);
        } else {
            setIsYoutubeMasthead(false);
        }

        // get the buying models based on the selected format
        getFormat(e.id).then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if(response) {
                    let buyingModels = response.buyingModels.map((buyingModel) => ({id: buyingModel.id, name: buyingModel.name}));

                    setBuyingModels(buyingModels);
                }
            }
        });
    }

    const onChangeCountries = (e: any) => {
        // when we change countries we need to update the cities select with the new cities list
        setIsCitiesLoaded(false);

        genericMultiSelectOnChangeHandler(e, form, setForm, 'countries_ids');

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
        if(typeof form.buying_model_id === 'number') {
            getBuyingModel(form.buying_model_id).then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    if(response) {
                        // if there's only one performance metric then we make the default selection
                        let buyingModelMetrics = response.performanceMetrics;

                        if(buyingModelMetrics.length === 1) {
                            // we can make a default selection
                            setDefaultPerformanceMetric({id: buyingModelMetrics[0].id, title: buyingModelMetrics[0].title});
                        }
                    }
                }
            });
        }
    }, [form.buying_model_id]);

    useEffect(() => {
        if(defaultPerformanceMetric !== undefined) {
            setReloadTargetMetrics(true);
        }
    }, [defaultPerformanceMetric]);

    useEffect(() => {
        if (cities.length > 0) {
            setIsCitiesLoaded(true);
        }
    }, [cities]);

    useEffect(() => {
        if (buyingModels.length > 0) {
            setIsBuyingModelsLoaded(true);
            // when we change the buying models, we need to make the reload target metrics
            // false so that we can go back to setting it true when the user selects from
            // the new list of buying models
            setReloadTargetMetrics(false);
        }
    }, [buyingModels]);

    const dateChangeHandler = (date: Date | null, key: string) => {
        genericDateOnChangeHandler(date, form, setForm, key);
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={form} validationSchema={CampaignOrderSchema}
                    onSubmit={onSubmit}
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
                                {/*Required if the format is not youtube masthead*/}
                                <KrysFormLabel text="Buying model" isRequired={!isYoutubeMasthead}/>

                                <SingleSelect isResourceLoaded={isBuyingModelsLoaded} options={buyingModels}
                                              defaultValue={undefined} form={form} setForm={setForm}
                                              name='buying_model_id' isClearable={!isYoutubeMasthead}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.buying_model_id ? formik.errors?.buying_model_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Cost" isRequired={!isYoutubeMasthead}/>

                                <Field className="form-control fs-base" type="text"
                                       placeholder="Enter cost for format" name="cost"/>

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name="cost" className="mt-2"/>
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format is not youtube masthead*/}
                                <KrysFormLabel text="Cost currency" isRequired={!isYoutubeMasthead}/>

                                <Select name="cost_currency_id"
                                        defaultValue={{id: 236, name: 'United States'}}
                                        options={countries}
                                        getOptionLabel={(country) => country.name}
                                        getOptionValue={(country) => country.id.toString()}
                                        placeholder='Choose currency for cost'
                                        isClearable={isYoutubeMasthead}
                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'cost_currency_id')}/>

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
                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, form, setForm, 'regions_ids')}
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
                                             defaultValue={defaultSelectCities} form={form} setForm={setForm}
                                             name={'cities_ids'} setSelected={setDefaultSelectedCities}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.cities_ids ? formik.errors?.cities_ids : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                {/*Required if the format is not youtube masthead*/}
                                <KrysFormLabel text="Target metric" isRequired={!isYoutubeMasthead}/>

                                <SingleSelect isResourceLoaded={reloadTargetMetrics} options={performanceMetrics}
                                              defaultValue={defaultPerformanceMetric} form={form} setForm={setForm}
                                              name='performance_metric_id' isClearable={isYoutubeMasthead} label='title'/>

                                {/*<Select name="performance_metric_id"*/}
                                {/*        options={performanceMetrics}*/}
                                {/*        getOptionLabel={(metric) => metric.title !== null ? metric.title : ''}*/}
                                {/*        getOptionValue={(metric) => metric.id.toString()}*/}
                                {/*        placeholder='Choose target metric for format'*/}
                                {/*        isClearable={isYoutubeMasthead}*/}
                                {/*        onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'performance_metric_id')}/>*/}

                                <div className="mt-3 text-danger">
                                    {formik.errors?.performance_metric_id ? formik.errors?.performance_metric_id : null}
                                </div>
                            </div>

                            <div className="mb-7">
                                <KrysFormLabel text="Target metric quantity" isRequired={!isYoutubeMasthead}/>

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
                                        defaultValue={{id: 236, name: 'United States'}}
                                        options={countries}
                                        getOptionLabel={(country) => country.name}
                                        getOptionValue={(country) => country.id.toString()}
                                        placeholder='Choose currency for booked amount'
                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'booked_currency_id')}/>

                                <div className="mt-3 text-danger">
                                    {formik.errors?.booked_currency_id ? formik.errors?.booked_currency_id : null}
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>

    )
}

export default CreateFormatForm;