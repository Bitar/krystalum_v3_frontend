import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {
    genericDateRangeOnChangeHandler,
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import {createFilterQueryParam, extractErrors} from '../../../../helpers/requests';
import Select from 'react-select';
import {Country} from '../../../../models/misc/Country';
import {Tier} from '../../../../models/misc/Tier';
import {getAllCountries} from '../../../../requests/misc/Country';
import axios from 'axios';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllTiers} from '../../../../requests/misc/Tier';
import FormErrors from '../../../../components/forms/FormErrors';
import {Region} from '../../../../models/misc/Region';
import {User} from '../../../../models/iam/User';
import {getAllRegions} from '../../../../requests/misc/Region';
import {DateRangePicker} from 'rsuite';
import {DateRange} from 'rsuite/DateRangePicker';
import {getAllUsers} from '../../../../requests/iam/User';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const PublisherIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [accountManagers, setAccountManagers] = useState<User[]>([]);

    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        // get the countries
        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of countries, then we fill our state with them
                if (response.data) {
                    setCountries(filterData(response.data, 'name', ['All Countries']));
                }
            }
        });

        // get the regions
        getAllRegions().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of regions, then we fill our state with them
                if (response.data) {
                    setRegions(filterData(response.data, 'name', ['All Regions', 'Rest of the world']));
                }
            }
        });

        // get the tiers
        getAllTiers().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of tiers, then we fill our state with them
                if (response.data) {
                    setTiers(response.data);
                }
            }
        });

        // get all the account manager users
        getAllUsers('filter[roles][]=12&filter[roles][]=5').then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setAccountManagers(response.data);
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any, key: string) => {
        if (key === 'countries_ids') {
            setFilters({...filters, countries_ids: e.map((entity: any) => entity.id), regions_ids: []})
        } else {
            genericMultiSelectOnChangeHandler(e, filters, setFilters, key);
        }
    };

    const dateRangeChangeHandler = (date: DateRange | null, key: string) => {
        genericDateRangeOnChangeHandler(date, filters, setFilters, key);
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
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

        tiersSelectRef.current?.clearValue();
        countriesSelectRef.current?.clearValue();
        regionsSelectRef.current?.clearValue();
        accountManagersSelectRef.current?.clearValue();

        setReset(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    useEffect(() => {
        // we also need to clear the values of the regions select fields
        // when the country select changes
        regionsSelectRef.current?.clearValue();
    }, [filters.countries_ids]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const tiersSelectRef = useRef<any>(null);
    const countriesSelectRef = useRef<any>(null);
    const regionsSelectRef = useRef<any>(null);
    const accountManagersSelectRef = useRef<any>(null);
    const startsBetweenDateRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id="#publishers-list-filter">
                <Col>
                    <div className="card card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={filterErrors}/>

                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            <Form onChange={onChangeHandler}>
                                <Row>
                                    <Col md={4}>
                                        <KrysFormLabel text="Name" isRequired={false}/>

                                        <Field className="form-control fs-base" type="text"
                                               placeholder="Filter by name" name="name"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="name" className="mt-2"/>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <KrysFormLabel text="HQ Countries" isRequired={false}/>

                                        <Select isMulti name="countries_ids"
                                                options={countries}
                                                getOptionLabel={(country) => country?.name}
                                                getOptionValue={(country) => country?.id.toString()}
                                                onChange={(e) => multiSelectChangeHandler(e, 'countries_ids')}
                                                ref={countriesSelectRef}
                                                placeholder="Filter by country"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="countries_ids" className="mt-2"/>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <KrysFormLabel text="HQ Regions" isRequired={false}/>

                                        <Select isMulti name="regions_ids"
                                                options={regions}
                                                getOptionLabel={(region) => region?.name}
                                                getOptionValue={(region) => region?.id.toString()}
                                                onChange={(e) => multiSelectChangeHandler(e, 'regions_ids')}
                                                ref={regionsSelectRef}
                                                placeholder="Filter by region"
                                                isDisabled={(!!(filters?.countries_ids && filters?.countries_ids.length > 0))}/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="regions_ids" className="mt-2"/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <KrysFormLabel text="Tiers" isRequired={false}/>

                                        <Select isMulti name="tiers_ids"
                                                options={tiers}
                                                getOptionLabel={(tier) => tier?.name}
                                                getOptionValue={(tier) => tier?.id.toString()}
                                                onChange={(e) => multiSelectChangeHandler(e, 'tiers_ids')}
                                                ref={tiersSelectRef}
                                                placeholder="Filter by tier"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="tiers_ids" className="mt-2"/>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <KrysFormLabel text="Integration Date" isRequired={false}/>

                                        <DateRangePicker name="starts_between"
                                                         placeholder="Select integration date range"
                                                         className="krys-datepicker krys-daterangepicker"
                                                         block
                                                         isoWeek
                                                         onChange={(date) => dateRangeChangeHandler(date, 'starts_between')}
                                                         ref={startsBetweenDateRef}
                                        />

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="starts_between" className="mt-2"/>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <KrysFormLabel text="Account Managers" isRequired={false}/>

                                        <Select isMulti name="account_managers_ids"
                                                options={accountManagers}
                                                getOptionLabel={(accountManager) => accountManager?.name}
                                                getOptionValue={(accountManager) => accountManager?.id.toString()}
                                                onChange={(e) => multiSelectChangeHandler(e, 'account_managers_ids')}
                                                ref={accountManagersSelectRef}
                                                placeholder="Filter by account manager"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="account_managers_ids" className="mt-2"/>
                                        </div>
                                    </Col>
                                </Row>

                                <FilterFormFooter resetFilter={resetFilter}/>
                            </Form>
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Collapse>
    );
}

export default PublisherIndexFilter;