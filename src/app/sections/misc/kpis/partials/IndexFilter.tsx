import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import Select from 'react-select';
import {initialQueryState} from '../../../../../_metronic/helpers';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../helpers/form';
import {createFilterQueryParam, submitRequest} from "../../../../helpers/requests";
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {getAllPerformanceMetrics} from '../../../../requests/misc/PerformanceMetric';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const KpiIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

    useEffect(() => {
        submitRequest(getAllPerformanceMetrics, [], (response) => {
            setPerformanceMetrics(response);
        }, setFilterErrors);

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
        isConversionSelectRef.current?.clearValue();
        isRateSelectRef.current?.clearValue();
        metricsSelectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const isConversionSelectRef = useRef<any>(null);
    const isRateSelectRef = useRef<any>(null);
    const metricsSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#kpis-list-filter'>
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

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Is rate?" isRequired={false}/>

                                                <Select name="is_rate"
                                                        options={[{id: 1, name: 'Yes'}, {id: 0, name: 'No'}]}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.id.toString()}
                                                        ref={isRateSelectRef}
                                                        isClearable={true}
                                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, filters, setFilters, 'is_rate')}
                                                        placeholder='Filter by rate type'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="is_rate" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Is conversion?" isRequired={false}/>

                                                <Select name="is_conversion"
                                                        options={[{id: 1, name: 'Yes'}, {id: 0, name: 'No'}]}
                                                        getOptionLabel={(option) => option.name}
                                                        getOptionValue={(option) => option.id.toString()}
                                                        ref={isConversionSelectRef}
                                                        isClearable={true}
                                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, filters, setFilters, 'is_conversion')}
                                                        placeholder='Filter by conversion type'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="is_conversion" className="mt-2"/>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
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

export default KpiIndexFilter;