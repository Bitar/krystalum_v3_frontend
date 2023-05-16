import React, {useRef, useState} from 'react';
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
    defaultCampaignOrderFormFields, getCampaignOrderSchema
} from '../../core/edit/orders/form';
import {getCampaignOrders, storeCampaignOrder} from '../../../../../requests/demand/CampaignOrder';
import {CampaignOrderColumns} from '../../core/edit/orders/TableColumns';
import {BookingTypeEnum} from '../../../../../enums/BookingTypeEnum';
import KrysModal from '../../../../../components/modals/KrysModal';
import CreateFormatForm from '../../partials/orders/formats/CreateFormatForm';
import {useCreateOrder} from '../../core/edit/orders/CreateOrderContext';
import {defaultCampaignOrderFormatFormFields} from '../../core/edit/orders/formats/form';
import FormatSummary from '../../partials/orders/formats/FormatSummary';

const EditOrders: React.FC = () => {
    const {campaign} = useCampaign();
    const {orderForm, setOrderForm, formatForm, setFormatForm, setCurrentFormatIndex, currentFormatIndex, isFormatCopy, setIsFormatCopy} = useCreateOrder();

    const krysApp = useKrysApp();

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);
    const [hideFormatModal, setHideFormatModal] = useState<boolean>(false);
    const [showFormatModal, setShowFormatModal] = useState<boolean>(false);

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        // we want to ignore the text fields that are in the format form
        if (!['cost', 'target', 'booked_amount', 'kpi_target'].includes(e.target.name)) {
            genericOnChangeHandler(e, orderForm, setOrderForm);
        }
    };

    const handleCreate = (e: any) => {
        console.log("here");
        if (campaign) {
            console.log(orderForm);

            // send API request to create the advertiser
            // storeCampaignOrder(campaign, orderForm).then(response => {
            //         if (axios.isAxiosError(response)) {
            //             // we need to show the errors
            //             setFormErrors(extractErrors(response));
            //         } else if (response === undefined) {
            //             // show generic error message
            //             setFormErrors([GenericErrorMessage])
            //         } else {
            //             // we were able to store the advertiser
            //             krysApp.setAlert({
            //                 message: new AlertMessageGenerator('campaign order', Actions.CREATE, KrysToastType.SUCCESS).message,
            //                 type: KrysToastType.SUCCESS
            //             });
            //
            //             // now that we have a new record successfully we need to refresh the table
            //             setRefreshTable(true);
            //
            //             // we need to clear the form data
            //             setOrderForm(defaultCampaignOrderFormFields);
            //         }
            //     }
            // );

            krysApp.setAlert({
                message: new AlertMessageGenerator('campaign order', Actions.CREATE, KrysToastType.SUCCESS).message,
                type: KrysToastType.SUCCESS
            });

            // now that we have a new record successfully we need to refresh the table
            setRefreshTable(true);

            // reset the whole context
            setOrderForm(defaultCampaignOrderFormFields);
            setFormatForm(defaultCampaignOrderFormatFormFields);
            setCurrentFormatIndex(null);
            setIsFormatCopy(false);
        }
    };

    const handleFormatSubmit = (e: any) => {
        // we need to take the format form, put add it to order form and then reset the format form
        let orderFormats = [...orderForm.formats];

        // remove the default split and kpis if these are the only values in the array
        let currentFormatKpis = formatForm.kpis;
        let currentFormatSplits = formatForm.splits;

        if (currentFormatKpis) {
            currentFormatKpis = currentFormatKpis.filter((option) => option.kpi_option !== '' && option.kpi_target !== '');
        }

        if (currentFormatSplits) {
            currentFormatSplits = currentFormatSplits.filter((option) => option.split_by_option !== '' && option.split_by_value.length > 0);
        }

        let formatToSubmit = {...formatForm, kpis: currentFormatKpis, splits: currentFormatSplits};

        if(currentFormatIndex !== null) {
            // we are updating a format not creating a new one
            // we need to check if this is copy or not
            if(isFormatCopy) {
                // append one to the list
                orderFormats.push(formatToSubmit);
            } else {
                orderFormats[currentFormatIndex] = formatToSubmit;
            }
        } else {
            // append one to the list
            orderFormats.push(formatToSubmit);
        }

        // update the order form with the new formats (either one edited or one newly added)
        setOrderForm({...orderForm, formats: orderFormats});

        // reset the format form
        setFormatForm(defaultCampaignOrderFormatFormFields);

        // after resetting the format form, we need to set the index of the current format as null
        setCurrentFormatIndex(null);

        // set the form as not copy
        setIsFormatCopy(false);

        // hide the modal
        setHideFormatModal(true);
    }

    const formFormRef = useRef<any>(null);

    const onModalSave = () => {
        if (formFormRef.current) {
            formFormRef.current.handleSubmit();
        }
    }

    const onModalClose = () => {
        // we just need to reset the form
        // reset the format form
        setFormatForm(defaultCampaignOrderFormatFormFields);

        // after resetting the format form, we need to set the index of the current format as null
        setCurrentFormatIndex(null);

        // hide the modal
        setHideFormatModal(true);
    }

    return (
        <>
            <KTCard className='card-bordered border-1'>
                <KTCardHeader text='Add new order'/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik initialValues={orderForm} validationSchema={getCampaignOrderSchema(campaign)}
                            onSubmit={handleCreate}
                            enableReinitialize>
                        {
                            (formik) => {
                                console.log(formik.errors);

                                return <Form onChange={onChangeHandler}>
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
                                            {
                                                orderForm.formats.map((format, index) => <FormatSummary
                                                    key={`format-summary-${index}`} index={index} format={format}
                                                    setShowFormatModal={setShowFormatModal}/>)
                                            }
                                        </div>

                                        <div className='mt-5'>
                                            {<KrysModal onSubmit={onModalSave} title={'Add new format'}
                                                        onClose={onModalClose}
                                                        buttonVariant='success' buttonSize='sm'
                                                        buttonIconClasses='fa-duotone fa-plus fs-6'
                                                        forceHide={hideFormatModal}
                                                        setForceHide={setHideFormatModal}
                                                        forceShow={showFormatModal}
                                                        setForceShow={setShowFormatModal}
                                                        buttonText='Add new format'>
                                                <CreateFormatForm formRef={formFormRef}
                                                                  onSubmitHandler={handleFormatSubmit}
                                                                  setHideFormatModal={setHideFormatModal}/>
                                            </KrysModal>}
                                        </div>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name="formats" className="mt-2"/>
                                        </div>
                                    </div>

                                    <KrysFormFooter cancelUrl={'/demand/campaigns'}/>
                                </Form>
                            }
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