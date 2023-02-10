import Select from 'react-select';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {Button, Col, Collapse, Row} from 'react-bootstrap';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from 'axios';

import KrysFormLabel from '../../../../components/forms/KrysFormLabel';
import FormErrors from '../../../../components/forms/FormErrors';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {Role} from '../../../../models/iam/Role';
import {getRoles} from '../../../../requests/iam/Role';
import {createFormData, extractErrors} from '../../../../helpers/requests';
import {initialQueryState} from '../../../../../_metronic/helpers';
import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';

interface FilterFields {
    name?: string,
    email?: string,
    roles?: []
}

const initialValues = {
    name: '',
    email: '',
    roles: []
}

interface Props {
    showFilter: boolean
}

const UserIndexFilter: React.FC<Props> = ({showFilter}) => {
    const {updateState} = useQueryRequest();

    const [roles, setRoles] = useState<Role[]>([]);
    const [filterErrors, setFilterErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterFields>();

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

    const UsersFilterSchema = Yup.object().shape({
        name: Yup.string().notRequired(),
        email: Yup.string().notRequired().email(),
        roles: Yup.array().of(Yup.object().shape({
            id: Yup.number(),
            name: Yup.string(),
            permissions: Yup.array().of(Yup.object().shape({
                id: Yup.number(),
                name: Yup.string()
            }))
        })).notRequired()
    });

    const multiSelectChangeHandler = (e: any) => {
        setFilters({...filters, 'roles': e.map((role: Role) => role.id)});
        // genericMultiSelectOnChangeHandler(e, filters, setFilters, 'roles');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const handleFilter = () => {
        updateState({
            filter: filters,
            ...initialQueryState,
        });
    }

    return (
        <Collapse in={showFilter}>
            <Row id='#users-list-filter'>
                <Col>
                    <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">
                        <FormErrors errorMessages={filterErrors}/>

                        <Formik initialValues={initialValues} validationSchema={UsersFilterSchema}
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
                                                        placeholder='Filter by role'/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="roles" className="mt-2"/>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-end mt-6">
                                            <Button variant="primary" type="submit">Filter</Button>
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