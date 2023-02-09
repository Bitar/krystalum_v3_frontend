import React, {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../../../../requests/iam/User'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {TableColumns} from '../core/TableColumns'
import KrysTable from '../../../../components/KrysTable';
import {Actions} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useSearchParams} from 'react-router-dom';
import FormSuccess from '../../../../components/form/FormSuccess';
import {Button, Col, Collapse, Row} from 'react-bootstrap';
import KrysFormLabel from '../../../../components/form/KrysFormLabel';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {Role} from '../../../../models/iam/Role';
import {getRoles} from '../../../../requests/iam/Role';
import axios from 'axios';
import {extractErrors} from '../../../../requests/helpers';
import {GenericErrorMessage, genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import FormErrors from '../../../../components/form/FormErrors';

interface FormFields {
    name?: string,
    email?: string,
    roles?: Role[]
}

const UserIndex = () => {
    const [searchParams] = useSearchParams();

    const [roles, setRoles] = useState<Role[]>([]);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [form, setForm] = useState<FormFields>();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        // get the roles so we can edit the user's roles
        getRoles().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
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
        genericMultiSelectOnChangeHandler(e, form, setForm, 'roles');
    };

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='user'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Users' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[{
                                          type: Actions.FILTER,
                                          target: 'users-list-filter',
                                          showFilter: showFilter,
                                          setShowFilter: setShowFilter
                                      }, {type: Actions.CREATE, url: '/iam/users'}]}/>

                        <KTCardBody>
                            <Collapse in={showFilter}>
                                <Row id='#users-list-filter'>
                                    <Col>
                                        <div className="card-rounded bg-primary bg-opacity-5 p-10 mb-15">s
                                            <FormErrors errorMessages={formErrors}/>

                                            <Formik initialValues={{name: ''}} validationSchema={UsersFilterSchema}
                                                    onSubmit={() => {
                                                    }}
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
                            <UserTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const UserTable = () => {
    const users = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => users, [users]);
    const columns = useMemo(() => TableColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={users.length > 0 ? users[0] : null} isLoading={isLoading}/>
    )
}

export default UserIndex
