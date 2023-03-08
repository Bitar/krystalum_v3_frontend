import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import {createFilterQueryParam, extractErrors} from '../../../../helpers/requests';
import Select from "react-select";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";
import {getAllPerformanceMetrics} from "../../../../requests/misc/PerformanceMetric";
import axios from "axios";
import FormErrors from "../../../../components/forms/FormErrors";

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const BuyingModelIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>();
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    useEffect(() => {
        getAllPerformanceMetrics().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else if (response.data) {
                // if we were able to get the list of performance metrics, then we fill our state with them
                setPerformanceMetrics(response.data);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'metrics');
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
        selectRef.current?.clearValue();
        metricsSelectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const selectRef = useRef<any>(null);
    const metricsSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#biuying-models-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={filterErrors}/>

                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                () => (
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
                                                <KrysFormLabel text="Performance Metrics" isRequired={false}/>

                                                <Select isMulti name="metrics"
                                                        options={performanceMetrics}
                                                        getOptionLabel={(performanceMetric) => performanceMetric.name}
                                                        getOptionValue={(performanceMetric) => performanceMetric.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={metricsSelectRef}
                                                        placeholder="Select one or more performance metrics"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="metrics" className="mt-2"/>
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

export default BuyingModelIndexFilter;