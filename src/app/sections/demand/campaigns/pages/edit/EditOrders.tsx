import React, {useState} from 'react';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {useCampaign} from '../../core/CampaignContext';
import {
    GenericErrorMessage,
    genericOnChangeHandler
} from '../../../../../helpers/form';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import axios from 'axios';
import {extractErrors} from '../../../../../helpers/requests';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import {
    CampaignOrderFormFields,
    CampaignOrderSchema,
    defaultCampaignOrderFormFields
} from '../../core/edit/orders/form';
import {getCampaignOrders, storeCampaignOrder} from '../../../../../requests/demand/CampaignOrder';
import {CampaignOrderColumns} from '../../core/edit/orders/TableColumns';
import {BookingTypeEnum} from '../../../../../enums/BookingTypeEnum';
import KrysModal from '../../../../../components/modals/KrysModal';
import CreateFormatForm from '../../partials/orders/formats/CreateFormatForm';

const EditOrders: React.FC = () => {
    const {campaign} = useCampaign();

    const krysApp = useKrysApp();

    const [form, setForm] = useState<CampaignOrderFormFields>(defaultCampaignOrderFormFields);

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        if (campaign) {
            // send API request to create the advertiser
            storeCampaignOrder(campaign, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the advertiser
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('campaign order', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultCampaignOrderFormFields);
                    }
                }
            );
        }
    };

    return (
        <>
            <KTCard className='card-bordered border-1'>
                <KTCardHeader text='Add new order'/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik initialValues={form} validationSchema={CampaignOrderSchema}
                            onSubmit={handleCreate}
                            enableReinitialize>
                        {
                            (formik) => (
                                <Form onChange={onChangeHandler}>
                                    {
                                        campaign?.bookingType?.id === BookingTypeEnum.BO ?
                                            <div className="mb-7">
                                                <KrysFormLabel text="Booking order number" isRequired={true}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Enter booking order number"
                                                       name="booking_order_number"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="booking_order_number" className="mt-2"/>
                                                </div>
                                            </div>
                                            :
                                            <div className="alert alert-dismissible bg-light-warning p-5 mb-10">
                                                <div>
                                                    <div className="d-flex flex-column pe-0 pe-sm-10">
                                                        <h4 className="fw-semibold">Reminder</h4>
                                                        <span className='text-gray-700'>Since orders under a TD campaign don't have a booking order
                                            number, you can directly proceed to adding formats under the order to create it.</span>
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                    <div className="mb-7">
                                        <h5 className="align-items-start flex-column">
                                            <p className="fw-bold text-dark mb-1">Formats</p>
                                            <p className="text-muted mt-1 fw-semibold fs-7">Add all the formats
                                                associated
                                                with this new booking order</p>
                                        </h5>

                                        <div className='mt-5'>
                                            {<KrysModal title={'Add new format'} buttonVariant='success' buttonSize='sm'
                                                        buttonIconClasses='fa-duotone fa-plus fs-6'
                                                        buttonText='Add new format'><CreateFormatForm onSubmit={() => console.log("hello")} /></KrysModal>}
                                        </div>
                                    </div>


                                    <KrysFormFooter cancelUrl={'/demand/campaigns'}/>
                                </Form>
                            )
                        }
                    </Formik>

                    <div className="separator separator-dashed my-10"></div>

                    {
                        campaign ? <KrysInnerTable
                            doRefetch={refreshTable}
                            slug="campaign-orders"
                            queryId={QUERIES.CAMPAIGN_ORDERS_LIST}
                            requestFunction={getCampaignOrders}
                            requestId={campaign.id} columnsArray={CampaignOrderColumns}
                        ></KrysInnerTable> : <></>
                    }

                </KTCardBody>
            </KTCard>
        </>

    );
};

export default EditOrders;