import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useAuth} from '../../../../../modules/auth';
import {getAllBookingTypes} from '../../../../../requests/misc/BookingType';
import {extractErrors} from '../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../helpers/form';
import {getAllBuyTypes} from '../../../../../requests/misc/BuyType';
import {getAllCountries} from '../../../../../requests/misc/Country';
import {filterData} from '../../../../../helpers/dataManipulation';
import {getAllAdvertiserTypes} from '../../../../../requests/demand/Options';
import {getAllAdvertisers} from '../../../../../requests/demand/Advertiser';
import {getAllAgencies} from '../../../../../requests/demand/Agency';
import {getAllRegions} from '../../../../../requests/misc/Region';
import {getAllObjectives} from '../../../../../requests/misc/Objective';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {BookingTypeEnum} from '../../../../../enums/BookingTypeEnum';
import {updateCampaign} from '../../../../../requests/demand/Campaign';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import SingleSelect from '../../../../../components/forms/SingleSelect';
import clsx from 'clsx';
import {AdvertiserTypeEnum} from '../../../../../enums/AdvertiserTypeEnum';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {BookingType} from '../../../../../models/misc/BookingType';
import {Objective} from '../../../../../models/misc/Objective';
import {BuyType} from '../../../../../models/misc/BuyType';
import {Agency} from '../../../../../models/demand/Agency';
import {Advertiser} from '../../../../../models/demand/Advertiser';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {AdvertiserType} from '../../../../../models/demand/Options';
import {Country} from '../../../../../models/misc/Country';
import {Region} from '../../../../../models/misc/Region';
import {RoleEnum} from '../../../../../enums/RoleEnum';
import AsyncSingleSelect from '../../../../../components/forms/AsyncSingleSelect';
import CreatableMultiSelect from '../../../../../components/forms/CreatableMultiSelect';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {
    CampaignInfoFormFields, CampaignInfoSchema,
    defaultCampaignInfoFormFields,
    fillEditForm
} from '../../core/edit/info/form';
import {useCampaign} from '../../core/CampaignContext';
import {useAccessControl} from '../../../../../modules/auth/AuthAccessControl';

// TODO add publisher_id
const defaultEditableFields = {
    name: false,
    booking_type_id: false,
    buy_type_id: false,
    seat_id: false,
    revenue_country_id: false,
    advertiser_type: false,
    advertiser_id: false,
    region_id: false,
    agency_id: false,
    objectives_ids: false
}

const EditDetails: React.FC = () => {
    const {campaign} = useCampaign();
    const {currentUser, hasAnyRoles} = useAuth();

    const [isTD, setIsTD] = useState<boolean>(false);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false);
    const [editableFields, setEditableFields] = useState<any>(defaultEditableFields);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    const [form, setForm] = useState<CampaignInfoFormFields>(defaultCampaignInfoFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [bookingTypes, setBookingTypes] = useState<BookingType[]>([]);
    const [buyTypes, setBuyTypes] = useState<BuyType[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [advertiserTypes, setAdvertiserTypes] = useState<AdvertiserType[]>([]);
    const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [objectives, setObjectives] = useState<Objective[]>([]);

    const [clearRegion, setClearRegion] = useState<boolean>(false);
    const [clearAgency, setClearAgency] = useState<boolean>(false);

    const krysApp = useKrysApp();
    const navigate = useNavigate();
    const accessControl = useAccessControl();

    useEffect(() => {
        if (campaign) {
            setForm(fillEditForm(campaign));

            if (campaign.bookingType.id === BookingTypeEnum.TD) {
                setIsTD(true);
            }

            setIsResourceLoaded(true);

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
            // we add the campaign's in the search because we want it in the results to choose it as default
            getAllAdvertisers(`filter[per_page]=30&filter[search]=${campaign.advertiser.name}`).then(response => {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaign]);

    useEffect(() => {
        if (campaign && currentUser) {
            // sales person edit: if it’s for him he can change name, buy type, seat ID, objectives + ownership
            // sales person edit not owner: only ownership
            // edit-campaigns-ui-fields: they can edit anything + propagation
            if (accessControl.userCan('edit-campaigns-ui-fields')) {
                // if the user has the permission to edit-campaigns-ui-fields
                // then he can edit all the fields
                // TODO add publisher_id
                let fields = {
                    name: true,
                    booking_type_id: true,
                    buy_type_id: true,
                    seat_id: true,
                    revenue_country_id: true,
                    advertiser_type: true,
                    advertiser_id: true,
                    region_id: true,
                    agency_id: true,
                    objectives_ids: true
                }

                setEditableFields(fields);
                setDisableSubmit(false);
            } else if ((hasAnyRoles(currentUser, [RoleEnum.DEMAND]) && campaign.owner !== null && campaign.owner.id === currentUser.id)
                || hasAnyRoles(currentUser, [RoleEnum.HEAD_OF_DEMAND, RoleEnum.ADMINISTRATOR, RoleEnum.CAMPAIGN_EDITOR])) {
                // if the user is Demand and he's the owner OR if he's the head of demand
                // he can change name, buy type, seat ID and objectives
                // TODO add publisher_id
                let fields = defaultEditableFields;

                fields.name = true;
                fields.buy_type_id = true;
                fields.seat_id = true;
                fields.objectives_ids = true;

                setEditableFields(fields);
                setDisableSubmit(false);
            } else {
                // the user can't edit any fields
                setDisableSubmit(true);
            }

            // the user is either sales but not owner or some other role that can't edit anything.
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, campaign]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    const onAdvertiserTypeChangeHandler = (e: any) => {
        // 1) we need to update the form with new advertiser type
        // 2) we need to clear all fields after changing advertiser type so that the user
        // can start fresh with his selection of advertiser linking fields
        setClearRegion(false);
        setClearAgency(false);

        // TODO add publisher_id
        const {region_id, agency_id, ...newForm} = form;

        setForm({...newForm, advertiser_type: e.id});
    };

    useEffect(() => {
        // we also need to clear the values of the select fields
        // when the advertiser type changes
        setClearRegion(true);
        setClearAgency(true);
    }, [form.advertiser_type]);

    const handleEdit = (e: any) => {
        if (campaign) {
            // send API request to create the campaign
            updateCampaign(campaign.id, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the campaign
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('campaign', Actions.EDIT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        navigate(`/demand/campaigns`);
                    }
                }
            );
        }
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardHeader text='Update basic information'/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form}
                        validationSchema={CampaignInfoSchema}
                        onSubmit={handleEdit}
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
                                           placeholder="Enter campaign name" name="name"
                                           disabled={!editableFields.name}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Booking type" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={bookingTypes}
                                                  defaultValue={campaign?.bookingType} form={form} setForm={setForm}
                                                  name='booking_type_id' customOnChange={(e) => {
                                        // if the chosen booking type has ID 2 then it's TD
                                        if (e) {
                                            setIsTD(e.id === BookingTypeEnum.TD);
                                        }

                                        genericSingleSelectOnChangeHandler(e, form, setForm, 'booking_type_id');
                                    }} placeholder='Choose booking type' isDisabled={!editableFields.booking_type_id}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.booking_type_id ? formik.errors?.booking_type_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Buy type" isRequired={isTD}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={buyTypes}
                                                  defaultValue={campaign?.buyType} form={form} setForm={setForm}
                                                  name='buy_type_id' isClearable={!isTD} placeholder='Choose buy type'
                                                  isDisabled={!editableFields.buy_type_id}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.buy_type_id && isTD ? formik.errors?.buy_type_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Seat ID" isRequired={isTD}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter the campaign's seat ID" name="seat_id"
                                           disabled={!editableFields.seat_id}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="seat_id" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Revenue country" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={countries}
                                                  defaultValue={campaign?.revenueCountry} form={form} setForm={setForm}
                                                  name='revenue_country_id' placeholder='Choose revenue country'
                                                  isDisabled={!editableFields.revenue_country_id}/>

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

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={advertiserTypes}
                                                  defaultValue={campaign?.advertiser_type} form={form} setForm={setForm}
                                                  name='advertiser_type' customOnChange={onAdvertiserTypeChangeHandler}
                                                  isDisabled={!editableFields.advertiser_type}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.advertiser_type ? formik.errors?.advertiser_type : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Advertiser" isRequired={true}/>

                                    <AsyncSingleSelect isResourceLoaded={isResourceLoaded} options={advertisers}
                                                       defaultValue={campaign?.advertiser} form={form} setForm={setForm}
                                                       name='advertiser_id' setFormErrors={setFormErrors}
                                                       getAllOptions={getAllAdvertisers}
                                                       isDisabled={!editableFields.advertiser_id}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.advertiser_id ? formik.errors?.advertiser_id : null}
                                    </div>
                                </div>

                                <div
                                    className={clsx("mb-7", form.advertiser_type === AdvertiserTypeEnum.WITH_AGENCY ? 'd-block' : 'd-none')}>
                                    {/* this is only required if advertiser_type is 'with_agency' */}
                                    <KrysFormLabel text="Agency"
                                                   isRequired={form.advertiser_type === AdvertiserTypeEnum.WITH_AGENCY}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={agencies}
                                                  defaultValue={campaign?.agency} form={form} setForm={setForm}
                                                  name='agency_id' doClear={clearAgency} showHierarchy={true}
                                                  isDisabled={!editableFields.agency_id}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.agency_id ? formik.errors?.agency_id : null}
                                    </div>
                                </div>

                                <div
                                    className={clsx("mb-7", form.advertiser_type !== AdvertiserTypeEnum.WITH_AGENCY ? 'd-block' : 'd-none')}>
                                    {/* this is only required if advertiser_type is NOT 'with_agency' */}
                                    <KrysFormLabel text="Region"
                                                   isRequired={form.advertiser_type !== AdvertiserTypeEnum.WITH_AGENCY}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={regions}
                                                  defaultValue={campaign?.region} form={form} setForm={setForm}
                                                  name='region_id' doClear={clearRegion}
                                                  isDisabled={!editableFields.region_id}/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.region_id ? formik.errors?.region_id : null}
                                    </div>
                                </div>

                                {/*// TODO add publisher*/}

                                <div className='separator separator-dashed my-10'></div>

                                <div className='mb-4'>
                                    <span className='fs-5 text-gray-700 d-flex fw-medium'>Campaign objectives</span>
                                    <span
                                        className='text-muted'>Define the campaign's objectives by choosing from the list or typing in your own</span>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Objectives" isRequired={false}/>

                                    <CreatableMultiSelect isResourceLoaded={isResourceLoaded} options={objectives}
                                                          defaultValue={campaign?.objectives} form={form}
                                                          setForm={setForm} name='objectives_ids'
                                                          newOptionsName='objectives'
                                                          isDisabled={!editableFields.objectives_ids}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="objectives_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/campaigns'} disableSubmit={disableSubmit}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
};

export default EditDetails;