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
import {submitRequest} from '../../../../helpers/requests';
import {Permission} from '../../../../models/iam/Permission';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {getAllPermissions} from '../../../../requests/iam/Permission';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const RoleIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        // get the permissions so we can add them to the filter dropdown
        submitRequest(getAllPermissions, [], (response) => {
            setPermissions(response);
        }, setFilterErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'permissions');
    };

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
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
                                                <KrysFormLabel text="Permissions" isRequired={false}/>

                                                <Select isMulti name="permissions"
                                                        options={permissions}
                                                        getOptionLabel={(permission) => permission.name}
                                                        getOptionValue={(permission) => permission.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by permission'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="permissions" className="mt-2"/>
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

export default RoleIndexFilter;