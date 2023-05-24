import axios from 'axios';
import {Form, Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../../../components/forms/FormErrors';
import {indentOptions} from '../../../../../../components/forms/IndentOptions';
import KrysFormFooter from '../../../../../../components/forms/KrysFormFooter';
import KrysFormLabel from '../../../../../../components/forms/KrysFormLabel';
import KrysRadioButton from '../../../../../../components/forms/KrysRadioButton';
import {SelectCardAction} from '../../../../../../components/misc/CardAction';
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum';
import {AlertMessageGenerator} from '../../../../../../helpers/AlertMessageGenerator';
import {
    GenericErrorMessage,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {extractErrors} from '../../../../../../helpers/requests';
import {DEFAULT_CAMPAIGN_RESTRICTION_TYPE} from '../../../../../../helpers/settings';
import {Actions, KrysToastType} from '../../../../../../helpers/variables';
import {CampaignRestrictionType} from '../../../../../../models/supply/Options';

import {useKrysApp} from '../../../../../../modules/general/KrysApp';
import {
    storePublicationCampaignRestriction
} from '../../../../../../requests/supply/publication/PublisherCampaignRestriction';
import {
    CampaignRestrictionsFilterFields,
    defaultCampaignRestrictionsFilterFields,
    defaultPublicationCampaignRestrictionFormFields,
    PublicationCampaignRestrictionFormFields,
    publicationCampaignRestrictionSchema
} from '../../../core/edit/campaign-restrictions/form';
import {usePublication} from '../../../core/PublicationContext';
import {usePublicationEdit} from '../../../core/PublicationEditContext';


const PublicationCampaignRestrictionCreate: React.FC = () => {
    const {options} = usePublication();
    const {publication, editOptions} = usePublicationEdit();
    const krysApp = useKrysApp();

    const [form, setForm] = useState<PublicationCampaignRestrictionFormFields>(defaultPublicationCampaignRestrictionFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [filters, setFilters] = useState<CampaignRestrictionsFilterFields>(defaultCampaignRestrictionsFilterFields);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [campaignRestrictionTypes, setCampaignRestrictionType] = useState<CampaignRestrictionType[]>([]);
    const [currentCampaignRestrictionTypeFormatted, setCurrentCampaignRestrictionTypeFormatted] = useState<string>(DEFAULT_CAMPAIGN_RESTRICTION_TYPE.name);

    const geosSelectRef = useRef<any>(null);
    const formatsSelectRef = useRef<any>(null);
    const campaignTypesSelectRef = useRef<any>(null);
    const websitePagesSelectRef = useRef<any>(null);
    const campaignRestrictionRequirementsSelectRef = useRef<any>(null);

    const {formats, regions, countries} = options;
    const {campaignTypes, websitePages, campaignRestrictionRequirements} = editOptions;

    useEffect(() => {
        if (publication) {
            // get publication campaign restrictions types options
            // getCampaignRestrictionTypes().then(response => {
            //     if (axios.isAxiosError(response)) {
            //         setFormErrors(extractErrors(response));
            //     } else if (response === undefined) {
            //         setFormErrors([GenericErrorMessage])
            //     } else {
            //         // if we were able to get the list of campaign restriction types, then we fill our state with them
            //         if (response.data) {
            //             setCampaignRestrictionType(response.data);
            //         }
            //     }
            // });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publication]);

    const selectChangeHandler = (e: any, key: string) => {
        genericSingleSelectOnChangeHandler(e, form, setForm, key);

        if (key === 'type' && e) {
            const type = campaignRestrictionTypes.find(campaignRestrictionType => campaignRestrictionType.id === e.id);

            if (type) {
                setCurrentCampaignRestrictionTypeFormatted(type.name)
                setFilters({...filters, 'type': e.id})
            }

            // as long as we are updating the create form, we should set the table refresh to false
            setRefreshTable(true);
        }
    };

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
            // send API request to create the publication campaign restrictions
            storePublicationCampaignRestriction(publication, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the publisher analytics
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('publication campaign restriction', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // clear the selected values from dropdown
                        geosSelectRef.current?.clearValue();
                        formatsSelectRef.current?.clearValue();
                        campaignTypesSelectRef.current?.clearValue();
                        websitePagesSelectRef.current?.clearValue();
                        campaignRestrictionRequirementsSelectRef.current?.clearValue();

                        // we need to clear the form data
                        setForm(defaultPublicationCampaignRestrictionFormFields);

                        // we need to clear the form data
                        setFormErrors([]);
                    }
                }
            );
        }
    };

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Add New Campaign Restriction"
                          actions={[new SelectCardAction('manage-supply', campaignRestrictionTypes, 'Select campaign restriction type', selectChangeHandler, 'type', DEFAULT_CAMPAIGN_RESTRICTION_TYPE)]}/>

            <KTCardBody>
                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">New Campaign Restriction Record Creation Form</span>
                    <span className="text-muted">This form provides guidelines and limitations for advertising campaigns within a specific publication.
                        Please submit the form below if you require additional restrictions to be linked for your advertising campaigns within a specific publication.
                    </span>
                </div>

                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={publicationCampaignRestrictionSchema(false)}
                        onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        ({errors}) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysRadioButton name="geo_type" label={'Regions'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             geo_type: GeoTypeEnum.REGION,
                                                             geo_ids: []
                                                         });
                                                     }}
                                                     defaultValue={form.geo_type === GeoTypeEnum.REGION}/>

                                    <KrysRadioButton name="geo_type" label={'Countries'}
                                                     onChangeHandler={(e) => {
                                                         e.stopPropagation();
                                                         setForm({
                                                             ...form,
                                                             geo_type: GeoTypeEnum.COUNTRY,
                                                             geo_ids: []
                                                         });
                                                     }}
                                                     defaultValue={form.geo_type === GeoTypeEnum.COUNTRY}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.geo_type ? errors?.geo_type : null}
                                    </div>
                                </div>

                                {
                                    form.geo_type === GeoTypeEnum.REGION &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Regions" isRequired={true}/>

                                        <Select isMulti name="geo_ids"
                                                options={regions}
                                                getOptionLabel={(region) => region.name}
                                                getOptionValue={(region) => region.id.toString()}
                                                onChange={(e) => {
                                                    multiSelectChangeHandler(e, 'geo_ids')
                                                }}
                                                placeholder="Select one or more region"
                                                ref={geosSelectRef}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_ids ? errors?.geo_ids : null}
                                        </div>
                                    </div>
                                }

                                {
                                    form.geo_type === GeoTypeEnum.COUNTRY &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Countries" isRequired={true}/>

                                        <Select isMulti name="geo_ids"
                                                options={countries}
                                                getOptionLabel={(country) => country.name}
                                                getOptionValue={(country) => country.id.toString()}
                                                onChange={(e) => {
                                                    multiSelectChangeHandler(e, 'geo_ids')
                                                }}
                                                placeholder="Select one or more country"
                                                ref={geosSelectRef}/>

                                        <div className="mt-1 text-danger">
                                            {errors?.geo_ids ? errors?.geo_ids : null}
                                        </div>
                                    </div>
                                }

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
                                    <KrysFormLabel text="Campaign types" isRequired={false}/>

                                    <Select isMulti name="campaign_type_ids"
                                            options={campaignTypes}
                                            getOptionLabel={(campaignType) => campaignType.name}
                                            getOptionValue={(campaignType) => campaignType.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'campaign_type_ids')
                                            }}
                                            placeholder="Select one or more campaign types"
                                            ref={campaignTypesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.campaign_type_ids ? errors?.campaign_type_ids : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Website pages" isRequired={false}/>

                                    <Select isMulti name="website_page_ids"
                                            options={websitePages}
                                            getOptionLabel={(websitePage) => websitePage.name}
                                            getOptionValue={(websitePage) => websitePage.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'website_page_ids')
                                            }}
                                            placeholder="Select one or more website pages"
                                            ref={websitePagesSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.website_page_ids ? errors?.website_page_ids : null}
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Campaign restriction requirements" isRequired={false}/>

                                    <Select isMulti name="campaign_restriction_requirement_ids"
                                            options={campaignRestrictionRequirements}
                                            getOptionLabel={(campaignRestrictionRequirement) => campaignRestrictionRequirement.name}
                                            getOptionValue={(campaignRestrictionRequirement) => campaignRestrictionRequirement.id.toString()}
                                            onChange={(e) => {
                                                multiSelectChangeHandler(e, 'campaign_restriction_requirement_ids')
                                            }}
                                            formatOptionLabel={indentOptions}
                                            placeholder="Select one or more campaign restriction requirements"
                                            ref={campaignRestrictionRequirementsSelectRef}/>

                                    <div className="mt-1 text-danger">
                                        {errors?.campaign_restriction_requirement_ids ? errors?.campaign_restriction_requirement_ids : null}
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/supply/publications'}/>
                            </Form>
                        )}
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                <div className="mb-4">
                            <span
                                className="fs-5 text-gray-700 d-flex fw-medium">{currentCampaignRestrictionTypeFormatted}</span>
                    <span
                        className="text-muted">This table displays a list of '{currentCampaignRestrictionTypeFormatted}' records:</span>
                </div>

                {/*{*/}
                {/*    publication &&*/}
                {/*    <KrysInnerTable*/}
                {/*        doRefetch={refreshTable}*/}
                {/*        slug="publication-campaign-restrictions"*/}
                {/*        queryId={QUERIES.PUBLICATION_CAMPAIGN_RESTRICTIONS_LIST}*/}
                {/*        requestFunction={getPublicationCampaignRestrictions}*/}
                {/*        requestId={publication.id}*/}
                {/*        columnsArray={PublicationCampaignRestrictionsColumns}*/}
                {/*        filters={filters}*/}
                {/*    ></KrysInnerTable>*/}
                {/*}*/}
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationCampaignRestrictionCreate;