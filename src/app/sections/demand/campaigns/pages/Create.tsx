import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../components/forms/KrysFormFooter';
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSelectOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {extractErrors} from '../../../../helpers/requests';
import {Actions, KrysToastType, PageTypes} from '../../../../helpers/variables';
import {storeCampaign} from '../../../../requests/demand/Campaign';
// import {CampaignSchema, defaultFormFields, FormFields} from '../core/form';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {CampaignSchema, defaultFormFields, FormFields} from '../core/form';
import {getAllTradingDesks} from '../../../../requests/demand/TradingDesk';
import {getAllBookingTypes} from '../../../../requests/misc/BookingType';
import {BookingType} from '../../../../models/misc/BookingType';
import Select from 'react-select';
import {BuyType} from '../../../../models/misc/BuyType';
import {getAllBuyTypes} from '../../../../requests/misc/BuyType';
import {getAllCountries} from '../../../../requests/misc/Country';
import {Country} from '../../../../models/misc/Country';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllAdvertiserTypes} from '../../../../requests/demand/Options';
import {AdvertiserType} from '../../../../models/demand/Options';
import {Advertiser} from '../../../../models/demand/Advertiser';
import {getAllAdvertisers} from '../../../../requests/demand/Advertiser';
import {Agency} from '../../../../models/demand/Agency';
import {getAllAgencies} from '../../../../requests/demand/Agency';
import {indentOptions} from '../../../../components/forms/IndentOptions';
import clsx from 'clsx';
import {getAllRegions} from '../../../../requests/misc/Region';
import {Region} from '../../../../models/misc/Region';
import {getAllObjectives} from '../../../../requests/misc/Objective';
import {Objective} from '../../../../models/misc/Objective';
import CreatableSelect from 'react-select/creatable';

const CampaignCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [isTD, setIsTD] = useState<boolean>(false);

    const [bookingTypes, setBookingTypes] = useState<BookingType[]>([]);
    const [buyTypes, setBuyTypes] = useState<BuyType[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [advertiserTypes, setAdvertiserTypes] = useState<AdvertiserType[]>([]);
    const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [objectives, setObjectives] = useState<Objective[]>([]);

    const krysApp = useKrysApp();
    // // we use this to navigate to the index page after the new campaign is saved
    // const navigate = useNavigate();
    //
    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_CAMPAIGNS, PageTypes.CREATE));

        // get the booking types
        getAllBookingTypes().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setBookingTypes(response.data);
                }
            }
        });

        // get the buy types
        getAllBuyTypes().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setBuyTypes(response.data);
                }
            }
        });

        // get all countries
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

        // get all advertiser types
        getAllAdvertiserTypes().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setAdvertiserTypes(response.data);
                }
            }
        });

        // get all advertisers
        getAllAdvertisers().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setAdvertisers(response.data);
                }
            }
        });

        // get all agencies
        getAllAgencies().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setAgencies(response.data);
                }
            }
        });

        // get all regions
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

        // get all objectives
        getAllObjectives().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setObjectives(response.data);
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //
    // const multiSelectChangeHandler = (e: any) => {
    //     genericMultiSelectOnChangeHandler(e, form, setForm, 'TODO');
    // };
    //
    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // add here any fields you don't want the default handler to handle
        // if (e.target.name !== 'advertiser_type') {
        genericOnChangeHandler(e, form, setForm);
        // }
    };

    const onAdvertiserTypeChangeHandler = (e: any) => {
        // 1) we need to update the form with new advertiser type
        // 2) we need to clear all fields after changing advertiser type so that the user
        // can start fresh with his selection of advertiser linking fields
        // TODO add publisher_id
        setForm({...form, advertiser_type: e.id, region_id: undefined, agency_id: undefined});
    };

    useEffect(() => {
        // we also need to clear the values of the select fields
        // when the advertiser type changes
        regionsSelectRef.current?.clearValue();
        agenciesSelectRef.current?.clearValue();
    }, [form.advertiser_type]);

    const handleCreate = (e: any) => {
        // send API request to create the campaign
        // storeCampaign(form).then(response => {
        //         if (axios.isAxiosError(response)) {
        //             // we need to show the errors
        //             setFormErrors(extractErrors(response));
        //         } else if (response === undefined) {
        //             // show generic error message
        //             setFormErrors([GenericErrorMessage])
        //         } else {
        //             // we were able to store the campaign
        //             krysApp.setAlert({message: new AlertMessageGenerator('TODO', Actions.CREATE, KrysToastType.SUCCESS).message, type: KrysToastType.SUCCESS})
        //             navigate(`TODO`);
        //         }
        //     }
        // );
    };

    const agenciesSelectRef = useRef<any>(null);
    const regionsSelectRef = useRef<any>(null);


    // const handleCreateObjective = (inputValue: any) => {
    //     const newOption = {
    //         id: inputValue.toLowerCase(),
    //         name: inputValue,
    //     };
    //
    //     console.log(inputValue);
    //
    //     console.log(form.objectives_ids);
    //     // setSelectedOption(newOption);
    // };

    interface Option {
        value: string,
        label: string
    }

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    return (
        <KTCard>
            <KTCardHeader text="Create New Campaign"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CampaignSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className='mb-4'>
                                    <span className='fs-5 text-gray-700 d-flex fw-medium'>General information</span>
                                    <span className='text-muted'>Enter the core details for the campaign</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter campaign name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Booking type" isRequired={true}/>

                                    <Select name="booking_type_id"
                                            className="fs-base"
                                            options={bookingTypes}
                                            getOptionLabel={(bookingType) => bookingType.name}
                                            getOptionValue={(bookingType) => bookingType.id.toString()}
                                            placeholder='Choose booking type'
                                            onChange={(e) => {
                                                // if the chosen booking type has ID 2 then it's TD
                                                if (e) {
                                                    setIsTD(e.id === 2);
                                                }

                                                genericSingleSelectOnChangeHandler(e, form, setForm, 'booking_type_id');
                                            }}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.booking_type_id ? formik.errors?.booking_type_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Buy type" isRequired={isTD}/>

                                    <Select name="buy_type_id"
                                            options={buyTypes}
                                            getOptionLabel={(buyType) => buyType.name}
                                            getOptionValue={(buyType) => buyType.id.toString()}
                                            placeholder='Choose buy type'
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'buy_type_id')}
                                            isClearable={!isTD}
                                    />

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.buy_type_id && isTD ? formik.errors?.buy_type_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Seat ID" isRequired={isTD}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the campaign's seat ID" name="seat_id"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="seat_id" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Revenue country" isRequired={true}/>

                                    <Select name="revenue_country_id"
                                            options={countries}
                                            getOptionLabel={(country) => country.name}
                                            getOptionValue={(country) => country.id.toString()}
                                            placeholder='Choose revenue country'
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'revenue_country_id')}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.revenue_country_id ? formik.errors?.revenue_country_id : null}
                                    </div>
                                </div>

                                <div className='separator separator-dashed my-10'></div>

                                <div className='mb-4'>
                                    <span className='fs-5 text-gray-700 d-flex fw-medium'>Advertiser linking</span>
                                    <span
                                        className='text-muted'>Link the campaign to its corresponding advertiser</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Advertiser type" isRequired={true}/>

                                    <Select name="advertiser_type"
                                            options={advertiserTypes}
                                            getOptionLabel={(advertiserType) => advertiserType.name}
                                            getOptionValue={(advertiserType) => advertiserType.id}
                                            placeholder='Choose advertiser type'
                                        // onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'advertiser_type')}
                                            onChange={onAdvertiserTypeChangeHandler}
                                    />

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.advertiser_type ? formik.errors?.advertiser_type : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Advertiser" isRequired={true}/>

                                    {/* TODO make it type ahead? (search with api call)*/}
                                    <Select name="advertiser_id"
                                            options={advertisers}
                                            getOptionLabel={(advertiser) => advertiser.name}
                                            getOptionValue={(advertiser) => advertiser.id.toString()}
                                            placeholder='Choose advertiser'
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'advertiser_id')}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.advertiser_id ? formik.errors?.advertiser_id : null}
                                    </div>
                                </div>

                                <div
                                    className={clsx("mb-7", form.advertiser_type === 'with_agency' ? 'd-block' : 'd-none')}>
                                    {/* this is only required if advertiser_type is 'with_agency' */}
                                    <KrysFormLabel text="Agency" isRequired={form.advertiser_type === 'with_agency'}/>

                                    <Select name="agency_id"
                                            options={agencies}
                                            getOptionLabel={(agency) => agency.name}
                                            getOptionValue={(agency) => agency.id.toString()}
                                            placeholder='Choose agency'
                                            ref={agenciesSelectRef}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'agency_id')}
                                            formatOptionLabel={indentOptions}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.agency_id ? formik.errors?.agency_id : null}
                                    </div>
                                </div>

                                <div
                                    className={clsx("mb-7", form.advertiser_type !== 'with_agency' ? 'd-block' : 'd-none')}>
                                    {/* this is only required if advertiser_type is NOT 'with_agency' */}
                                    <KrysFormLabel text="Region" isRequired={form.advertiser_type !== 'with_agency'}/>

                                    <Select name="region_id"
                                            options={regions}
                                            getOptionLabel={(region) => region.name}
                                            getOptionValue={(region) => region.id.toString()}
                                            placeholder='Choose region'
                                            ref={regionsSelectRef}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'region_id')}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.region_id ? formik.errors?.region_id : null}
                                    </div>
                                </div>

                                {/*// TODO add publisher*/}

                                <div className='separator separator-dashed my-10'></div>

                                <div className='mb-4'>
                                    <span className='fs-5 text-gray-700 d-flex fw-medium'>Objectives</span>
                                    <span
                                        className='text-muted'>Define the campaign's objectives by choosing from listing or typing in your own</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Objectives" isRequired={false}/>

                                    {/*<CreatableSelect isMulti name="objectives_ids"*/}
                                    {/*                 options={objectives}*/}
                                    {/*                 getOptionLabel={(objective) => objective.name}*/}
                                    {/*                 getOptionValue={(objective) => objective.id?.toString()}*/}
                                    {/*    // onChange={(e) => genericMultiSelectOnChangeHandler(e, form, setForm, 'objectives_ids')}*/}
                                    {/*                 onChange={(e) => console.log(e)}*/}
                                    {/*    // placeholder="Select or type one or more objectives"*/}
                                    {/*    // onCreateOption={handleCreateObjective}*/}
                                    {/*    // formatCreateLabel={(inputValue) => `Create new objective "${inputValue}"`}*/}
                                    {/*/>*/}

                                    <CreatableSelect isMulti name="objectives_ids"
                                                     options={objectives.map((objective) => ({
                                                         value: objective.id.toString(),
                                                         label: objective.name,
                                                     }))}
                                                     // getOptionLabel={(objective) => objective.name}
                                                     // getOptionValue={(objective) => objective.id?.toString()}
                                                     // onCreateOption={(newOptionValue) => {
                                                     //     const newOption = {
                                                     //         value: Math.random().toString(36).substr(2, 9), // generate a random ID
                                                     //         label: newOptionValue
                                                     //     };
                                                     //
                                                     //     setSelectedOptions([...selectedOptions, newOption]);
                                                     // }}
                                                     // isValidNewOption={(inputValue, selectedOptions) =>
                                                     //     !selectedOptions.some((option) => option.label === inputValue)
                                                     // }
                                                     onChange={(e) => {
                                                         let newObjectives : string [] = [];
                                                         let selectedObjectives : number[] = [];

                                                         e.forEach((option) => {
                                                             if(isNaN(parseInt(option.value))) {
                                                                 // this is a new option
                                                                 newObjectives.push(option.value);
                                                             } else {
                                                                 // this is a selected option
                                                                 selectedObjectives.push(parseInt(option.value));
                                                             }

                                                             setForm({...form, objectives_ids: selectedObjectives, objectives: newObjectives});
                                                         });
                                                     }
                                                     }
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="objectives_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/campaigns'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
}

export default CampaignCreate;