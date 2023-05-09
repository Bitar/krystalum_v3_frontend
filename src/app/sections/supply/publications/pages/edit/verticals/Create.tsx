import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Form, Formik} from 'formik';
import Select from 'react-select';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler, genericSingleSelectOnChangeHandler
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
    PublicationVerticalFormFields,
    PublicationVerticalSchema
} from '../../../core/edit/verticals/form';
import {PublicationVerticalsColumns} from '../../../core/edit/verticals/TableColumns';
import {getAllVerticals} from '../../../../../../requests/misc/Vertical';
import {Vertical} from '../../../../../../models/misc/Vertical';


const PublicationVerticalCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationVerticalFormFields>(defaultPublicationVerticalFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [verticals, setVerticals] = useState<Vertical[]>([]);

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
                        setVerticals(response.data);
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);
    };

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = () => {
        if (publication) {
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

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultPublicationVerticalFormFields);

                        // we need to clear the form data
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

                <Formik initialValues={form} validationSchema={PublicationVerticalSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Vertical" isRequired={true}/>

                                    <Select name="vertical_id"
                                            menuPlacement={'top'}
                                            options={verticals}
                                            getOptionLabel={(vertical) => vertical?.name}
                                            getOptionValue={(vertical) => vertical?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'vertical_id')
                                            }}
                                            placeholder="Select a vertical"
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.vertical_id ? errors?.vertical_id : null}
                                    </div>
                                </div>

                                {/*TODO*/}

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