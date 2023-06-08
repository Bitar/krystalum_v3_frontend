import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import Select from 'react-select';
import {initialQueryState} from '../../../../../_metronic/helpers';
import FilterFormFooter from '../../../../components/forms/FilterFormFooter';
import FormErrors from '../../../../components/forms/FormErrors';

import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {createFilterQueryParam, submitRequest} from '../../../../helpers/requests';
import {Role} from '../../../../models/iam/Role';
import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {getAllRoles} from '../../../../requests/iam/Role';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const UserIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

    const [roles, setRoles] = useState<Role[]>([]);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        // get the roles so we can edit the user's roles
        submitRequest(getAllRoles, [], (response) => {
            setRoles(response);
        }, setFilterErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'roles');
    };

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
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
            <Row id='#users-list-filter'>
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
                                                <KrysFormLabel text="Email address"
                                                               isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by email" name="email"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="email" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <KrysFormLabel text="Roles" isRequired={false}/>

                                                <Select isMulti name="roles"
                                                        options={roles}
                                                        getOptionLabel={(role) => role.name}
                                                        getOptionValue={(role) => role.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by role'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="roles" className="mt-2"/>
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

export default UserIndexFilter;