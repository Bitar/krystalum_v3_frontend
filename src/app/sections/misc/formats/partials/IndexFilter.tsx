import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import Select from 'react-select';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import FormErrors from '../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {
    genericFilterHandler,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {submitRequest} from "../../../../helpers/requests";
import {BuyingModel} from '../../../../models/misc/BuyingModel';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {getAllBuyingModels} from '../../../../requests/misc/BuyingModel';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const FormatIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [reset, setReset] = useState<boolean>(false);
    const [buyingModels, setBuyingModels] = useState<BuyingModel[]>([]);

    useEffect(() => {
        submitRequest(getAllBuyingModels, [], (response) => {
            setBuyingModels(response);
        }, setFilterErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'buying_models');
    };

    const handleFilter = () => {
        genericFilterHandler(setExportQuery, filters, updateState, reset);
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

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <KrysFormLabel text="Code" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
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