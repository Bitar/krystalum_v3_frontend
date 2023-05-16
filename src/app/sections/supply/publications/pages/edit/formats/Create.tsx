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
    genericOnChangeHandler, genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import FormErrors from '../../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {
    getPublicationFormats,
    storePublicationFormat
} from '../../../../../../requests/supply/publication/PublicationFormat';
import {usePublication} from '../../../core/PublicationContext';
import {
    defaultPublicationFormatFormFields,
    PublicationFormatFormFields, publicationFormatSchema
} from '../../../core/edit/formats/form';
import {PublicationFormatsColumns} from '../../../core/edit/formats/TableColumns';
import {getAllFormats} from '../../../../../../requests/misc/Format';
import {Format} from '../../../../../../models/misc/Format';
import {getFormatTypes} from '../../../../../../requests/supply/Options';
import {FormatType} from '../../../../../../models/supply/Options';
import {indentOptions} from '../../../../../../components/forms/IndentOptions';


const PublicationFormatCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationFormatFormFields>(defaultPublicationFormatFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [formats, setFormats] = useState<Format[]>([]);
    const [formatTypes, setFormatTypes] = useState<FormatType[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const formatsSelectRef = useRef<any>(null);
    const formatTypesSelectRef = useRef<any>(null);

    const krysApp = useKrysApp();

    useEffect(() => {
        if (publication) {
            // get the formats
            getAllFormats().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of formats, then we fill our state with them
                    if (response.data) {
                        setFormats(response.data);
                    }
                }
            });

            // get the format types
            getFormatTypes().then(response => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    // if we were able to get the list of format types, then we fill our state with them
                    if (response.data) {
                        setFormatTypes(response.data)
                    }
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const multiSelectChangeHandler = (e: any, key: string) => {
        genericMultiSelectOnChangeHandler(e, form, setForm, key);
    };

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
            // as long as we are updating the create form, we should set the table refresh to false
            setRefreshTable(false);

            // send API request to create the publication formats
            storePublicationFormat(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication formats
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication format', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        formatsSelectRef.current?.clearValue();
                        formatTypesSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublicationFormatFormFields);

                        // we need to clear the form errors
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Format"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationFormatSchema(false)} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Formats" isRequired={true}/>

                                    <Select isMulti name="format_ids"
                                            options={formats}
                                            getOptionLabel={(format) => format.name}
                                            getOptionValue={(format) => format.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'format_ids')
                                            }}
                                            formatOptionLabel={indentOptions}
                                            placeholder="Select one or more formats"
                                            ref={formatsSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.format_ids ? errors?.format_ids : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Type" isRequired={true}/>

                                    <Select name="type"
                                            menuPlacement={'top'}
                                            options={formatTypes}
                                            getOptionLabel={(formatType) => formatType?.name}
                                            getOptionValue={(formatType) => formatType?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'type')
                                            }}
                                            placeholder="Select a type"
                                            isClearable={true}
                                            ref={formatTypesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.type ? errors?.type : null}
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
                        slug="publication-formats"
                        queryId={QUERIES.PUBLICATION_FORMATS_LIST}
                        requestFunction={getPublicationFormats}
                        requestId={publication.id}
                        columnsArray={PublicationFormatsColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationFormatCreate;