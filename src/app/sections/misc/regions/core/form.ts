import * as Yup from 'yup';
import {Type} from "../../../../models/misc/Region";

export interface FormFields {
    name: string,
    type: Type | null,
    regions: any[],
    countries: any[]
    canUpdate?: boolean
}

export const defaultFormFields = {name: '', type: null, regions: [], countries: [], canUpdate: false};

export const RegionSchema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.object().required(),
});