import React, {useEffect, useRef, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterSchema} from '../../core/filterForm';
import {
    genericDateRangeOnChangeHandler,
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../../helpers/form';
import {initialQueryState} from '../../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../../components/forms/FilterFormFooter';
import {createFilterQueryParam, extractErrors} from '../../../../../helpers/requests';
import FormErrors from '../../../../../components/forms/FormErrors';
import Select from 'react-select';
import {getAllCountries} from '../../../../../requests/misc/Country';
import axios from 'axios';
import {filterData} from '../../../../../helpers/dataManipulation';
import {Publisher} from '../../../../../models/supply/publisher/Publisher';
import {getAllPublishers} from '../../../../../requests/supply/publisher/Publisher';
import {getAllLanguages} from '../../../../../requests/misc/Language';
import {Language} from '../../../../../models/misc/Language';
import {DateRangePicker} from 'rsuite';
import {DateRange} from 'rsuite/DateRangePicker';
import {getAllFormats} from '../../../../../requests/misc/Format';
import {Format} from '../../../../../models/misc/Format';
import {Country} from '../../../../../models/misc/Country';
import {Region} from '../../../../../models/misc/Region';
import {Technology} from '../../../../../models/misc/Technology';
import {AdServer} from '../../../../../models/misc/AdServer';
import {Vertical} from '../../../../../models/misc/Vertical';
import {getAllAdServers} from '../../../../../requests/misc/AdServer';
import {getAllTechnologies} from '../../../../../requests/misc/Technology';
import {getAllVerticals} from '../../../../../requests/misc/Vertical';
import {getAllRegions} from '../../../../../requests/misc/Region';
import {indentOptions} from '../../../../../components/forms/IndentOptions';
import KrysSwitch from '../../../../../components/forms/KrysSwitch';
import {TagsInput} from 'react-tag-input-component';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>,
    filters: any,
    setFilters: React.Dispatch<React.SetStateAction<any>>
}

const PublicationFilter: React.FC<Props> = ({showFilter, setExportQuery, filters, setFilters}) => {
    const {updateState} = useQueryRequest();

    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);

    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [formats, setFormats] = useState<Format[]>([]);
    const [adServers, setAdServers] = useState<AdServer[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [verticals, setVerticals] = useState<Vertical[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);

    useEffect(() => {
        // get the list of all publishers
        getAllPublishers().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of publishers, then we fill our state with them
                if (response.data) {
                    setPublishers(response.data);
                }
            }
        });

        // get the list of all languages
        getAllLanguages().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of languages, then we fill our state with them
                if (response.data) {
                    setLanguages(response.data);
                }
            }
        });

        // get the list of all formats
        getAllFormats().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of formats, then we fill our state with them
                if (response.data) {
                    setFormats(filterData(response.data, 'name', ['All Formats']));
                }
            }
        });

        // get the list of all ad servers
        getAllAdServers().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of ad servers, then we fill our state with them
                if (response.data) {
                    setAdServers(response.data);
                }
            }
        });

        // get the list of all technologies
        getAllTechnologies().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of technologies, then we fill our state with them
                if (response.data) {
                    setTechnologies(response.data);
                }
            }
        });

        // get the list of all verticals
        getAllVerticals().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of verticals, then we fill our state with them
                if (response.data) {
                    setVerticals(response.data);
                }
            }
        });

        // get the list of all countries
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

        // get the list of all regions
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
        if (!['unique_identifiers', 'urls'].includes(e.target.name)) {
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

        publishersSelectRef.current?.clearValue();
        languagesSelectRef.current?.clearValue();
        formatsSelectRef.current?.clearValue();
        adServersSelectRef.current?.clearValue();
        technologiesSelectRef.current?.clearValue();
        verticalsSelectRef.current?.clearValue();
        countriesSelectRef.current?.clearValue();
        regionsSelectRef.current?.clearValue();

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

    const publishersSelectRef = useRef<any>(null);
    const languagesSelectRef = useRef<any>(null);
    const formatsSelectRef = useRef<any>(null);
    const adServersSelectRef = useRef<any>(null);
    const technologiesSelectRef = useRef<any>(null);
    const verticalsSelectRef = useRef<any>(null);
    const countriesSelectRef = useRef<any>(null);
    const regionsSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id="#publications-list-filter">
                <Col>
                    <div className="card card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={filterErrors}/>

                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                <Form onChange={onChangeHandler}>
                                    <Row>
                                        <Col md={4}>
                                            <KrysFormLabel text="Name" isRequired={false}/>

                                            <Field className="form-control fs-base" type="text"
                                                   placeholder="Filter by name" name="name"/>
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
                                            <KrysFormLabel text="Publisher(s)" isRequired={false}/>

                                            <Select isMulti name="publishers_ids"
                                                    options={publishers}
                                                    getOptionLabel={(publisher) => publisher?.name}
                                                    getOptionValue={(publisher) => publisher?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'publishers_ids')}
                                                    ref={publishersSelectRef}
                                                    placeholder="Filter by publisher(s)"/>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <KrysFormLabel text="Live Date" isRequired={false}/>

                                            <DateRangePicker name="live_date_range"
                                                             placeholder="Filter by live date range"
                                                             className="krys-datepicker krys-daterangepicker"
                                                             block
                                                             isoWeek
                                                             onChange={(date) => dateRangeChangeHandler(date, 'live_date_range')}
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="Publication Creation Date" isRequired={false}/>

                                            <DateRangePicker name="creation_date_range"
                                                             placeholder="Filter by creation date range"
                                                             className="krys-datepicker krys-daterangepicker"
                                                             block
                                                             isoWeek
                                                             onChange={(date) => dateRangeChangeHandler(date, 'creation_date_range')}
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="URL(s)" isRequired={false}/>

                                            <TagsInput
                                                value={filters.urls}
                                                onChange={(e) => setFilters({...filters, urls: e})}
                                                name="urls"
                                                placeHolder="Filter by URL(s)"
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <KrysFormLabel text="Language(s)" isRequired={false}/>

                                            <Select isMulti name="languages_ids"
                                                    options={languages}
                                                    getOptionLabel={(language) => language?.name}
                                                    getOptionValue={(language) => language?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'languages_ids')}
                                                    ref={languagesSelectRef}
                                                    placeholder="Filter by language(s)"/>
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="Format(s)" isRequired={false}/>

                                            <Select isMulti name="formats_ids"
                                                    options={formats}
                                                    getOptionLabel={(format) => format?.name}
                                                    getOptionValue={(format) => format?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'formats_ids')}
                                                    ref={formatsSelectRef}
                                                    placeholder="Filter by format(s)"
                                                    formatOptionLabel={indentOptions}/>
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="Ad Server(s)" isRequired={false}/>

                                            <Select isMulti name="ad_servers_ids"
                                                    options={adServers}
                                                    getOptionLabel={(adServer) => adServer?.name}
                                                    getOptionValue={(adServer) => adServer?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'ad_servers_ids')}
                                                    ref={adServersSelectRef}
                                                    placeholder="Filter by ad server(s)"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <KrysFormLabel text="Technology(s)" isRequired={false}/>

                                            <Select isMulti name="technologies_ids"
                                                    options={technologies}
                                                    getOptionLabel={(technology) => technology?.name}
                                                    getOptionValue={(technology) => technology?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'technologies_ids')}
                                                    ref={technologiesSelectRef}
                                                    placeholder="Filter by technology(s)"/>
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="Vertical(s)" isRequired={false}/>

                                            <Select isMulti name="verticals_ids"
                                                    options={verticals}
                                                    getOptionLabel={(vertical) => vertical?.name}
                                                    getOptionValue={(vertical) => vertical?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'verticals_ids')}
                                                    ref={verticalsSelectRef}
                                                    placeholder="Filter by vertical(s)"
                                                    formatOptionLabel={indentOptions}/>
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="HQ Country(ies)" isRequired={false}/>

                                            <Select isMulti name="countries_ids"
                                                    options={countries}
                                                    getOptionLabel={(country) => country?.name}
                                                    getOptionValue={(country) => country?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'countries_ids')}
                                                    ref={countriesSelectRef}
                                                    placeholder="Filter by country(ies)"/>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <KrysFormLabel text="HQ Region(s)" isRequired={false}/>

                                            <Select isMulti name="regions_ids"
                                                    options={regions}
                                                    getOptionLabel={(region) => region?.name}
                                                    getOptionValue={(region) => region?.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'regions_ids')}
                                                    ref={regionsSelectRef}
                                                    placeholder="Filter by region(s)"
                                                    isDisabled={(!!(filters?.countries_ids && filters?.countries_ids.length > 0))}
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <KrysFormLabel text="Deal PMP" isRequired={false}/>

                                            <KrysSwitch name="is_deal_pmp" onChangeHandler={(e) => {
                                                e.stopPropagation();
                                                setFilters({...filters, is_deal_pmp: Number(!filters.is_deal_pmp)});
                                            }} defaultValue={Boolean(filters.is_deal_pmp)}/>
                                        </Col>
                                    </Row>

                                    <FilterFormFooter resetFilter={resetFilter}/>
                                </Form>
                            }
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Collapse>
    );
}

export default PublicationFilter;