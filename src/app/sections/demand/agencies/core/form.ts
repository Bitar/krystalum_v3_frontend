import * as Yup from 'yup';

export interface FormFields {
    name: string,
    region_id?: number,
    holding_group_id?: number
}

export const defaultFormFields = {name: ''};

export const AgencySchema = Yup.object().shape({
    name: Yup.string().required(),
    region_id: Yup.number().when('holding_group_id', {
        is: (holding_group_id: number) => ! holding_group_id,
        then: Yup.number().required('region is required if holding group is not selected'), // required only if the holding group is not set
        otherwise: Yup.number().notRequired() // not required if the holding is set
    }),
    holding_group_id: Yup.number().notRequired()
});