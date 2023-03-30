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
import Select from 'react-select';
import axios from 'axios';
import {filterData} from '../../../../helpers/dataManipulation';
import {getAllCountries} from '../../../../requests/misc/Country';
import {Country} from '../../../../models/misc/Country';
import FormErrors from '../../../../components/forms/FormErrors';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const AdvertiserIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setCountries(filterData(response.data, 'name', ['All Countries']));
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
        countriesSelectRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const countriesSelectRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#roles-list-filter'>
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

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Country" isRequired={false}/>

                                                <Select isMulti name="countries"
                                                        options={countries}
                                                        getOptionLabel={(country) => country.name}
                                                        getOptionValue={(country) => country.id.toString()}
                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, filters, setFilters, 'countries')}
                                                        ref={countriesSelectRef}
                                                        placeholder='Filter by HQ country'/>

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

export default AdvertiserIndexFilter;