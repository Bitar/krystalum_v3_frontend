import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {Col, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../modules/table/QueryRequestProvider';
import {genericOnChangeHandler} from '../../helpers/form';
import {initialQueryState} from '../../../_metronic/helpers';

interface Props {
    slug: string;
    filters: any;
}

interface SearchFilterFields {
    search?: string;
}

const defaultSearchFilterFields = {search: ''}

const KrysTableSearchFilter: React.FC<Props> = ({slug, filters}) => {
    const {updateState} = useQueryRequest();

    const [searchFilters, setSearchFilters] = useState<SearchFilterFields>(defaultSearchFilterFields);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, searchFilters, setSearchFilters);
    };

    const handleFilter = () => {
        updateState({
            filter: filters ? {...searchFilters, ...filters} : searchFilters,
            ...initialQueryState,
        });
    }

    return (
        <Row id={`#${slug}-list-search-filter`} className="pb-10">
            <Col>
                <Formik initialValues={defaultSearchFilterFields}
                        onSubmit={handleFilter}
                        enableReinitialize>
                    <Form onChange={onChangeHandler}>
                        <Row>
                            <Col md={4}>
                                <div className="d-flex align-items-center position-relative my-1">
                                    <i className="fa-duotone fa-magnifying-glass fs-4 position-absolute ms-6"></i>
                                    <Field className="form-control ps-13" type="text"
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

export default KrysTableSearchFilter;