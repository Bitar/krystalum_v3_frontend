import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import {asyncSelectLoadOptions, createFilterQueryParam, extractErrors} from '../../../../helpers/requests';
import {TagsInput} from 'react-tag-input-component';
import {Advertiser} from '../../../../models/demand/Advertiser';
import {getAllAdvertisers} from '../../../../requests/demand/Advertiser';
import axios from 'axios';
import {Agency} from '../../../../models/demand/Agency';
import {getAllAgencies} from '../../../../requests/demand/Agency';
import FormErrors from '../../../../components/forms/FormErrors';
import AsyncSelect from 'react-select/async';
import {indentOptions} from '../../../../components/forms/IndentOptions';
import Select from 'react-select';
import {getAllBookingTypes} from '../../../../requests/misc/BookingType';
import {BookingType} from '../../../../models/misc/BookingType';
import {BuyType} from '../../../../models/misc/BuyType';
import {getAllBuyTypes} from '../../../../requests/misc/BuyType';
import {getAllCountries} from '../../../../requests/misc/Country';
import {filterData} from '../../../../helpers/dataManipulation';
import {Country} from '../../../../models/misc/Country';
import {getAllUsers} from '../../../../requests/iam/User';
import {User} from '../../../../models/iam/User';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const CampaignIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
    const [bookingTypes, setBookingTypes] = useState<BookingType[]>([]);
    const [buyTypes, setBuyTypes] = useState<BuyType[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(function () {
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

        // get the advertisers (only first 30 because we'll be using the async select to fetch the others)
        // filter[per_page]=30
        getAllAdvertisers('filter[per_page]=30').then(response => {
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

        // get all users regardless of role
        getAllUsers('filter[user_type]=internal').then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setUsers(response.data);
                }
            }
        });
    }, []);

    const onChangeHandler = (e: any) => {
        if (e.target.name !== 'unique_identifiers') {
            genericOnChangeHandler(e, filters, setFilters);
        }
    };

    const handleFilter = () => {
        setExportQuery(createFilterQueryParam(filters));

        updateState({
            filter: reset ? undefined : filters,
            ...initialQueryState,
        });
    }

    useEffect(() => {
        handleFilter();
        agenciesSelectRef.current?.clearValue();
        advertisersSelectRef.current?.clearValue();
        bookingTypesSelectRef.current?.clearValue();
        buyTypesSelectRef.current?.clearValue();
        countriesSelectRef.current?.clearValue();
        usersSelectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const agenciesSelectRef = useRef<any>(null);
    const advertisersSelectRef = useRef<any>(null);
    const bookingTypesSelectRef = useRef<any>(null);
    const buyTypesSelectRef = useRef<any>(null);
    const countriesSelectRef = useRef<any>(null);
    const usersSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#campaigns-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={formErrors}/>

                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                () => (
                                    <Form onChange={onChangeHandler}>
                                        <Row>
                                            <Col md={4}>
                                                <KrysFormLabel text="Name" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by campaign name" name="name"/>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Unique identifier(s)" isRequired={false}/>

                                                <TagsInput
                                                    value={filters.unique_identifiers}
                                                    onChange={(e) => setFilters({...filters, unique_identifiers: e})}
                                                    name="unique_identifiers"
                                                    placeHolder="Filter by unique identifier(s)"
                                                />
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Agency(ies)" isRequired={false}/>

                                                <Select isMulti name="agencies"
                                                        options={agencies}
                                                        getOptionLabel={(agency) => agency.name}
                                                        getOptionValue={(agency) => agency.id.toString()}
                                                        ref={agenciesSelectRef}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'agencies')}
                                                        placeholder="Select one or more agencies"
                                                        formatOptionLabel={indentOptions}
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={4}>
                                                <KrysFormLabel text="Advertiser(s)" isRequired={false}/>

                                                <AsyncSelect isMulti
                                                             placeholder='Choose one or more advertisers'
                                                             defaultOptions={advertisers}
                                                             getOptionLabel={(advertiser) => advertiser.name}
                                                             getOptionValue={(advertiser) => advertiser.id.toString()}
                                                             ref={advertisersSelectRef}
                                                             onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'advertisers')}
                                                             loadOptions={inputValue => asyncSelectLoadOptions(inputValue, getAllAdvertisers, setFormErrors)}/>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Booking type(s)" isRequired={false}/>

                                                <Select isMulti name="booking_types"
                                                        options={bookingTypes}
                                                        getOptionLabel={(bookingType) => bookingType.name}
                                                        getOptionValue={(bookingType) => bookingType.id.toString()}
                                                        ref={bookingTypesSelectRef}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'booking_types')}
                                                        placeholder="Select one or more booking types"
                                                />
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Buy type(s)" isRequired={false}/>

                                                <Select isMulti name="buy_types"
                                                        options={buyTypes}
                                                        getOptionLabel={(buyType) => buyType.name}
                                                        getOptionValue={(buyType) => buyType.id.toString()}
                                                        ref={buyTypesSelectRef}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'buy_types')}
                                                        placeholder="Select one or more buy types"
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={4}>
                                                <KrysFormLabel text="Revenue country(ies)" isRequired={false}/>

                                                <Select isMulti name="countries"
                                                        options={countries}
                                                        getOptionLabel={(country) => country.name}
                                                        getOptionValue={(country) => country.id.toString()}
                                                        ref={countriesSelectRef}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'countries')}
                                                        placeholder="Select one or more countries"
                                                />
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Campaign owner(s)" isRequired={false}/>

                                                <Select isMulti name="owners"
                                                        options={users}
                                                        getOptionLabel={(user) => user.name}
                                                        getOptionValue={(user) => user.id.toString()}
                                                        ref={usersSelectRef}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'owners')}
                                                        placeholder="Select one or more owners"
                                                />
                                            </Col>
                                        </Row>

                                        <FilterFormFooter resetFilter={resetFilter}/>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Collapse>
    );
}

export default CampaignIndexFilter;