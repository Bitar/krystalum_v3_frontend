import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {genericFilterHandler, genericOnChangeHandler} from '../../../../helpers/form';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const PerformanceMetricIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [reset, setReset] = useState<boolean>(false);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const handleFilter = () => {
        genericFilterHandler(setExportQuery, filters, updateState, reset);
    }

    useEffect(() => {
        handleFilter();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    return (
        <Collapse in={showFilter}>
            <Row id='#performance-metrics-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <Formik initialValues={defaultFilterFields}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                (formik) => (
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
                                                <KrysFormLabel text="Title" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by title" name="title"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="title" className="mt-2"/>
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

export default PerformanceMetricIndexFilter;