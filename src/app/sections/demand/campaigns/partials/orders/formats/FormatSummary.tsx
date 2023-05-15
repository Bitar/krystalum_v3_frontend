import React, {Dispatch, SetStateAction} from 'react';
import {CampaignOrderFormatFormFields} from '../../../core/edit/orders/formats/form';
import {Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useCreateOrder} from '../../../core/edit/orders/CreateOrderContext';
import Swal from 'sweetalert2';

interface Props {
    index: number,
    format: CampaignOrderFormatFormFields,
    setShowFormatModal: Dispatch<SetStateAction<any>>
}

const FormatSummary: React.FC<Props> = ({index, format, setShowFormatModal}) => {
    const {orderForm, setOrderForm, setCurrentFormatIndex, setFormatForm, setIsFormatCopy} = useCreateOrder();

    const handleDeleteFormat = async () => {
        const {isConfirmed} = await Swal.fire({
            title: 'Delete format',
            text: 'Are you sure you want to delete this format?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm Delete',
            confirmButtonColor: "#DB4437",
            cancelButtonText: 'Dismiss',
            reverseButtons: true
        })

        if(isConfirmed) {
            let formats = [...orderForm.formats];

            // remove the current format from the list
            if (formats.length > index) {
                formats.splice(index, 1);

                setOrderForm({...orderForm, formats: formats});
            }
        }
    }

    const handleEditFormat = () => {
        // first we set the current format ID as the index of the format
        setCurrentFormatIndex(index);

        // set the format form to have the data of the format we want to edit
        setFormatForm(format);

        // launch the modal
        setShowFormatModal(true);
    }

    const handleCopyFormat = () => {
        // first we set the current format ID as the index of the format
        setCurrentFormatIndex(index);

        // then we mark the current form as create copy
        setIsFormatCopy(true);

        // set the format form to have the data of the format we want to edit
        setFormatForm(format);

        // launch the modal
        setShowFormatModal(true);
    }

    return (
        <Row key={`format-summary-${index}`}
             className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
            <Col md={9}>
                {format.format_name} &middot; {format.buying_model_name} &middot; {format.cost} {format.cost_currency_name} &middot; {format.start_date} &middot; {format.end_date} &middot; {format.regions_names?.join(", ")} &middot; {format.countries_names?.join(", ")} &middot; {format.cities_names?.join(", ")} &middot; {format.booked_amount} {format.booked_currency_name} &middot; {format.splits?.length} splits &middot; {format.kpis?.length} kpis
            </Col>

            <Col md={3}>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Copy Format</Tooltip>}>
                    <Button className='btn-sm btn-icon mt-1' variant='active-light-primary'
                            onClick={handleCopyFormat}>
                        <i className={'fa-duotone fs-4 text-primary fa-copy'}></i>
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit Format</Tooltip>}>
                    <Button className='btn-sm btn-icon mt-1' variant='active-light-warning'
                            onClick={handleEditFormat}>
                        <i className={'fa-duotone fs-4 text-warning fa-pencil'}></i>
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete Format</Tooltip>}>
                    <Button className='btn-sm btn-icon mt-1' variant='active-light-danger'
                            onClick={handleDeleteFormat}>
                        <i className={'fa-duotone fs-4 text-danger fa-trash'}></i>
                    </Button>
                </OverlayTrigger>
            </Col>
        </Row>
    )
}

export default FormatSummary;