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
import axios from 'axios';
import {getAllBuyingModels} from '../../../../requests/misc/BuyingModel';
import {BuyingModel} from '../../../../models/misc/BuyingModel';
import FormErrors from "../../../../components/forms/FormErrors";

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const FormatIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);
    const [buyingModels, setBuyingModels] = useState<BuyingModel[]>([]);

    useEffect(() => {
        getAllBuyingModels().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else if (response.data) {
                // if we were able to get the list of buying models, then we fill our state with them
                setBuyingModels(response.data);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'buying_models');
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
        buyingModelsRef.current?.clearValue();
        setReset(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const buyingModelsRef = useRef<any>(null);

    return (
        <Collapse in={showFilter}>
            <Row id='#formats-list-filter'>
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
                                                <KrysFormLabel text="Code" isRequired={false}/>

                                                <Field className="form-control fs-6" type="text"
                                                       placeholder="Filter by code" name="code"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="code" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Buying Models" isRequired={false}/>

                                                <Select isMulti name="buying_models"
                                                        options={buyingModels}
                                                        getOptionLabel={(buyingModel) => buyingModel.name}
                                                        getOptionValue={(buyingModel) => buyingModel.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={buyingModelsRef}
                                                        placeholder="Select one or more buying models"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="buying_models" className="mt-2"/>
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

export default FormatIndexFilter;