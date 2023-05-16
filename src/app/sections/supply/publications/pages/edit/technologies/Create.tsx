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
    getPublicationTechnologies,
    storePublicationTechnology
} from '../../../../../../requests/supply/publication/PublicationTechnology';
import {usePublication} from '../../../core/PublicationContext';
import {
    defaultPublicationTechnologyFormFields,
    PublicationTechnologyFormFields, publicationTechnologySchema
} from '../../../core/edit/technologies/form';
import {PublicationTechnologiesColumns} from '../../../core/edit/technologies/TableColumns';
import {getAllTechnologies} from '../../../../../../requests/misc/Technology';
import {Technology} from '../../../../../../models/misc/Technology';
import {indentOptions} from '../../../../../../components/forms/IndentOptions';
import {filterData} from '../../../../../../helpers/dataManipulation';


const PublicationTechnologyCreate: React.FC = () => {
    const {publication, setPublication} = usePublication();

    const [form, setForm] = useState<PublicationTechnologyFormFields>(defaultPublicationTechnologyFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [technologies, setTechnologies] = useState<Technology[]>([]);

    const technologiesSelectRef = useRef<any>(null);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get the technologies
            getAllTechnologies().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of technologies, then we fill our state with them
                    if (response.data) {
                        const excludedTechnologiesNames: string[] = publication.technologies ? publication.technologies?.map((technology) => technology.name) : [];

                        setTechnologies(filterData(response.data, 'name', excludedTechnologiesNames));
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

            // send API request to create the publication technologies
            storePublicationTechnology(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication technologies0
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication technology', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // set the updated publication with its all technologies so that the dropdown will be updated and
                        // the new added technologies will be excluded from the dropdown
                        setPublication(response)

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        technologiesSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublicationTechnologyFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Technology"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationTechnologySchema(false)} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Technologies" isRequired={true}/>

                                    <Select isMulti name="technology_ids"
                                            options={technologies}
                                            getOptionLabel={(technology) => technology.name}
                                            getOptionValue={(technology) => technology.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'technology_ids')
                                            }}
                                            formatOptionLabel={indentOptions}
                                            placeholder="Select one or more technologies"
                                            ref={technologiesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.technology_ids ? errors?.technology_ids : null}
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
                        slug="publication-technologies"
                        queryId={QUERIES.PUBLICATION_TECHNOLOGIES_LIST}
                        requestFunction={getPublicationTechnologies}
                        requestId={publication.id}
                        columnsArray={PublicationTechnologiesColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationTechnologyCreate;