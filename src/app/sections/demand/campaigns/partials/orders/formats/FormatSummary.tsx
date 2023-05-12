import React from 'react';
import {CampaignOrderFormatFormFields} from '../../../core/edit/orders/formats/form';

interface Props {
    index: number,
    format: CampaignOrderFormatFormFields
}

const FormatSummary: React.FC<Props> = ({index, format}) => {
    return (
        <div key={`format-summary-${index}`} className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
            {format.format_name} &middot; {format.buying_model_name} &middot; {format.cost} {format.cost_currency_name} &middot; {format.start_date} &middot; {format.end_date} &middot; {format.regions_names} &middot; {format.countries_names} &middot; {format.cities_names} &middot; {format.booked_amount} {format.booked_currency_name} &middot; {format.splits?.length} splits &middot; {format.kpis?.length} kpis
        </div>
    )
}

export default FormatSummary;