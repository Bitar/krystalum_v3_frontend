import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Form, Formik} from 'formik';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage, genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../../../helpers/form';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {
    getPublicationVerticals,
    storePublicationVertical
} from '../../../../../../requests/supply/publication/PublicationVertical';
import {usePublication} from '../../../core/PublicationContext';
import {
    defaultPublicationVerticalFormFields,
    PublicationVerticalFormFields, publicationVerticalSchema,
} from '../../../core/edit/verticals/form';
import {PublicationVerticalsColumns} from '../../../core/edit/verticals/TableColumns';
import {getAllVerticals} from '../../../../../../requests/misc/Vertical';
import {Vertical} from '../../../../../../models/misc/Vertical';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {indentOptions} from '../../../../../../components/forms/IndentOptions';


const PublicationVerticalCreate: React.FC = () => {
    const {publication, setPublication} = usePublication();

    const [form, setForm] = useState<PublicationVerticalFormFields>(defaultPublicationVerticalFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

    const verticalsSelectRef = useRef<any>(null);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get the verticals
            getAllVerticals().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of verticals, then we fill our state with them
                    if (response.data) {
                        const excludedVerticalsNames: string[] = publication.verticals ? publication.verticals?.map((vertical) => vertical.vertical.name) : [];

                        setVerticals(filterData(response.data, 'name', excludedVerticalsNames));
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const multiSelectChangeHandler = (e: any, key: string) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publication) {
            // as long as we are updating the create form, we should set the table refresh to false
            setRefreshTable(false);

            // send API request to create the publication payments
            storePublicationVertical(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication payments
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication vertical', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // set the updated publication with its all verticals so that the dropdown will be updated and
                        // the new added verticals will be excluded from the dropdown
                        setPublication(response)

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        verticalsSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublicationVerticalFormFields);

                        // we need to clear the form errors
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Vertical"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationVerticalSchema(false)} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Vertical" isRequired={true}/>

                                    <Select isMulti name="vertical_ids"
                                            options={verticals}
                                            getOptionLabel={(vertical) => vertical.name}
                                            getOptionValue={(vertical) => vertical.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'vertical_ids')
                                            }}
                                            formatOptionLabel={indentOptions}
                                            placeholder="Select one or more verticals"
                                            ref={verticalsSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.vertical_ids ? errors?.vertical_ids : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    publication &&
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publication-verticals"
                        queryId={QUERIES.PUBLICATION_VERTICALS_LIST}
                        requestFunction={getPublicationVerticals}
                        requestId={publication.id}
                        columnsArray={PublicationVerticalsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationVerticalCreate;