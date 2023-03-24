import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {Col, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider';
import {defaultSearchFilterFields, SearchFilterFields} from '../core/filterForm';
import {genericOnChangeHandler} from '../../../../helpers/form';
import {initialQueryState} from '../../../../../_metronic/helpers';

const PublisherContactSearchFilter: React.FC = () => {
    const {updateState} = useQueryRequest();

    const [filters, setFilters] = useState<SearchFilterFields>(defaultSearchFilterFields);

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
        <Row id="#publishers-contacts-list-search-filter" className="pb-10">
            <Col>
                <Formik initialValues={defaultSearchFilterFields}
                        onSubmit={handleFilter}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <Row>
                            <Col md={4}>
                                <div className="d-flex align-items-center position-relative my-1">
                                    <i className="fa-duotone fa-magnifying-glass fs-1 position-absolute ms-6"></i>
                                    <Field className="form-control ps-14" type="text"
                                           placeholder="Search ..." name="search"/>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Col>
        </Row>
    );
}

export default PublisherContactSearchFilter;