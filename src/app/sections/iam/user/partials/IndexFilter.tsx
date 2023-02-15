import Select from 'react-select';
import React, {useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from 'axios';

import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FormErrors from '../../../../components/forms/FormErrors';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {Role} from '../../../../models/iam/Role';
import {getRoles} from '../../../../requests/iam/Role';
import {extractErrors} from '../../../../helpers/requests';
import {initialQueryState} from '../../../../../_metronic/helpers';
import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';

interface Props {
    showFilter: boolean
}

const UserIndexFilter: React.FC<Props> = ({showFilter}) => {
    const {updateState} = useQueryRequest();

    const [roles, setRoles] = useState<Role[]>([]);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        // get the roles so we can edit the user's roles
        getRoles().then(response => {
            if (axios.isAxiosError(response)) {
                setFilterErrors(extractErrors(response));
            } else if (response === undefined) {
                setFilterErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of roles, then we fill our state with them
                if (response.data) {
                    setRoles(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const multiSelectChangeHandler = (e: any) => {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, 'roles');
    };

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

                                                <Field className="form-control fs-6" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <KrysFormLabel text="Email address"
                                                               isRequired={false}/>

                                                <Field className="form-control fs-6" type="text"
                                                       placeholder="Filter by email" name="email"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="email" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <KrysFormLabel text="Roles" isRequired={false}/>

                                                <Select isMulti name="roles"
                                                        options={roles}
                                                        getOptionLabel={(role) => role?.name}
                                                        getOptionValue={(role) => role?.id.toString()}
                                                        onChange={multiSelectChangeHandler}
                                                        ref={selectRef}
                                                        placeholder='Filter by role'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="roles" className="mt-2"/>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-end mt-6">
                                            <button type='reset' className='btn btn-secondary btn-sm me-2'
                                                    ref={(el) => {
                                                        if (el) {
                                                            el.style.setProperty('background-color', '#e1e3ea', 'important');
                                                        }
                                                    }} onClick={resetFilter}>Reset
                                            </button>

                                            <button type='submit' className='btn btn-sm btn-primary'
                                                    ref={(el) => {
                                                        if (el) {
                                                            el.style.setProperty('background-color', '#009ef7', 'important');
                                                        }
                                                    }}>Filter
                                            </button>
                                        </div>
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