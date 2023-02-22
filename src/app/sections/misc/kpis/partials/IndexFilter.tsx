import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {genericOnChangeHandler} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import Select from 'react-select';

interface Props {
    showFilter: boolean
}

const KpiIndexFilter: React.FC<Props> = ({showFilter}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const handleFilter = () => {
        updateState({
            filter: reset ? undefined : filters,
            ...initialQueryState,
        });
    }

    useEffect(() => {
        handleFilter();
        selectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const selectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#kpis-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
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
                                                <KrysFormLabel text="Is rate?" isRequired={false}/>

                                                <Select name="is_rate"
                                                        options={[{id: 1, name: 'Yes'}, {id: 0, name: 'No'}]}
                                                        getOptionLabel={(option) => option?.name}
                                                        getOptionValue={(option) => option?.id.toString()}
                                                        // onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by rate type'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="is_rate" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Is conversion?" isRequired={false}/>

                                                <Select name="is_conversion"
                                                        options={[{id: 1, name: 'Yes'}, {id: 0, name: 'No'}]}
                                                        getOptionLabel={(option) => option?.name}
                                                        getOptionValue={(option) => option?.id.toString()}
                                                    // onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by conversion type'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="is_conversion" className="mt-2"/>
                                                </div>
                                            </Col>
                                        </Row>

                                        <FilterFormFooter resetFilter={resetFilter} />
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