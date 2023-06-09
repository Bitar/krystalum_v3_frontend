import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import Select from 'react-select';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {filterData} from '../../../../helpers/dataManipulation';
import {
    genericFilterHandler,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {submitRequest} from '../../../../helpers/requests';
import {Country} from '../../../../models/misc/Country';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {getAllCountries} from '../../../../requests/misc/Country';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const CityIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [countries, setCountries] = useState<Country[]>([]);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        // get the countries
        submitRequest(getAllCountries, [], (response) => {
            setCountries(filterData(response, 'name', ['All Countries']));
        }, setFilterErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'countries');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const handleFilter = () => {
        genericFilterHandler(setExportQuery, filters, updateState, reset);
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
            <Row id='#cities-list-filter'>
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
                                                <KrysFormLabel text="Countries" isRequired={false}/>

                                                <Select isMulti name="countries"
                                                        options={countries}
                                                        getOptionLabel={(country) => country?.name}
                                                        getOptionValue={(country) => country?.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by country'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="countries" className="mt-2"/>
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

export default CityIndexFilter;