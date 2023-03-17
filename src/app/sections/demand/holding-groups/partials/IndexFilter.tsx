import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import {createFilterQueryParam, extractErrors} from "../../../../helpers/requests";
import Select from 'react-select';
import {Region} from '../../../../models/misc/Region';
import axios from 'axios';
import {getAllRegions} from '../../../../requests/misc/Region';
import FormErrors from '../../../../components/forms/FormErrors';
import {TradingDesk} from '../../../../models/demand/TradingDesk';
import {getAllTradingDesks} from '../../../../requests/demand/TradingDesk';
import {filterData} from '../../../../helpers/dataManipulation';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const HoldingGroupFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);

    const [regions, setRegions] = useState<Region[]>([]);
    const [tradingDesks, setTradingDesks] = useState<TradingDesk[]>([]);

    useEffect(() => {
        getAllRegions().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    let allRegions = filterData(response.data, 'name', 'All Regions');

                    allRegions = filterData(allRegions, 'name', 'Rest of the world');

                    setRegions(allRegions);
                }
            }
        });

        getAllTradingDesks().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setTradingDesks(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        regionsSelectRef.current?.clearValue();
        tradingDesksSelectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const regionsSelectRef = useRef<any>(null);
    const tradingDesksSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#holding-groups-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={filterErrors}/>

                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                (formik) => (
                                    <Form onChange={onChangeHandler}>
                                        <Row>
                                            <Col md={4}>
                                                <KrysFormLabel text="Name" isRequired={false}/>

                                                <Field className="form-control fs-6" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Regions" isRequired={false}/>

                                                <Select isMulti name="regions"
                                                        options={regions}
                                                        getOptionLabel={(region) => region.name}
                                                        getOptionValue={(region) => region.id.toString()}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'regions')}
                                                        ref={regionsSelectRef}
                                                        placeholder='Filter by region'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="regions" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Trading desks" isRequired={false}/>

                                                <Select isMulti name="trading_desks"
                                                        options={tradingDesks}
                                                        getOptionLabel={(tradingDesk) => tradingDesk.name}
                                                        getOptionValue={(tradingDesk) => tradingDesk.id.toString()}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'trading_desks')}
                                                        ref={tradingDesksSelectRef}
                                                        placeholder='Filter by trading desk'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="trading_desks" className="mt-2"/>
                                                </div>
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

export default HoldingGroupFilter;