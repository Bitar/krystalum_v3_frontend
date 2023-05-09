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
    getPublicationFormats,
    storePublicationFormat
} from '../../../../../../requests/supply/publication/PublicationFormat';
import {usePublication} from '../../../core/PublicationContext';
import {
    defaultPublicationFormatFormFields,
    PublicationFormatFormFields,
    PublicationFormatSchema
} from '../../../core/edit/formats/form';
import {PublicationFormatsColumns} from '../../../core/edit/formats/TableColumns';
import {filterData} from '../../../../../../helpers/dataManipulation';
import {getAllFormats} from '../../../../../../requests/misc/Format';
import {Format} from '../../../../../../models/misc/Format';


const PublicationFormatCreate: React.FC = () => {
    const {publication} = usePublication();

    const [form, setForm] = useState<PublicationFormatFormFields>(defaultPublicationFormatFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [formats, setFormats] = useState<Format[]>([]);

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
                        setFormats(filterData(response.data, 'name', ['All Formats']));
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
            storePublicationFormat(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publication payments
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication format', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultPublicationFormatFormFields);

                        // we need to clear the form data
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

                <Formik initialValues={form} validationSchema={PublicationFormatSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Format" isRequired={true}/>

                                    <Select name="format_id"
                                            menuPlacement={'top'}
                                            options={formats}
                                            getOptionLabel={(format) => format?.name}
                                            getOptionValue={(format) => format?.id.toString()}
                                            onChange={(e) => {
                                                selectChangeHandler(e, 'format_id')
                                            }}
                                            placeholder="Select a format"
                                            isClearable={true}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.format_id ? errors?.format_id : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Type" isRequired={true}/>

                                    {/*<Select name="type"*/}
                                    {/*        menuPlacement={'top'}*/}
                                    {/*        options={types}*/}
                                    {/*        getOptionLabel={(type) => type?.name}*/}
                                    {/*        getOptionValue={(type) => type?.id.toString()}*/}
                                    {/*        onChange={(e) => {*/}
                                    {/*            selectChangeHandler(e, 'type')*/}
                                    {/*        }}*/}
                                    {/*        placeholder="Select a type"*/}
                                    {/*        isClearable={true}/>*/}

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