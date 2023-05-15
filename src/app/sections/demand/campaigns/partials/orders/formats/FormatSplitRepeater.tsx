import {Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import Select from 'react-select';
import MultiSelect from '../../../../../../components/forms/MultiSelect';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {GenericErrorMessage, genericSingleSelectOnChangeHandler} from '../../../../../../helpers/form';
import {getAllDevices} from '../../../../../../requests/misc/Device';
import {getAllLanguages} from '../../../../../../requests/misc/Language';
import {getAllOperatingSystems} from '../../../../../../requests/misc/OperatingSystem';
import {getAllAudiences} from '../../../../../../requests/misc/Audience';
import axios, {AxiosError} from 'axios';
import {extractErrors} from '../../../../../../helpers/requests';
import {FormatSplitField} from '../../../core/edit/orders/formats/formatSplitField';
import Button from 'react-bootstrap/Button';
import {CampaignOrderFormatFormFields} from '../../../core/edit/orders/formats/form';

type SplitToApiCall = {
    [key: string]: Promise<any | AxiosError<any, any> | undefined>;
};

interface Props {
    defaultValue: FormatSplitField,
    index: number,
    setParentForm: Dispatch<SetStateAction<any>>,
    parentForm: CampaignOrderFormatFormFields,
    setParentFormErrors: Dispatch<SetStateAction<any>>,
}

const FormatSplitRepeater: React.FC<Props> = ({
                                                  defaultValue,
                                                  index,
                                                  setParentForm,
                                                  parentForm,
                                                  setParentFormErrors
                                              }) => {
    const [form, setForm] = useState<FormatSplitField>(defaultValue);

    const [splitValues, setSplitValues] = useState<any[]>([]);
    const [reloadSplitValues, setReloadSplitValues] = useState<boolean>(false);

    // when we change the split option => we set the reload values to false
    // when we're done fetching the values of the split option => we set reload values to true

    useEffect(() => {
        setForm(defaultValue);
    }, [defaultValue]);

    const onChangeSplitOption = (e: any) => {
        // do API call to fill the values
        setReloadSplitValues(false);

        genericSingleSelectOnChangeHandler(e, form, setForm, 'split_by_option');
    }

    useEffect(() => {
        if (form.split_by_option) {
            let splitToApiCall: SplitToApiCall = {
                'devices': getAllDevices(),
                'languages': getAllLanguages(),
                'operating-systems': getAllOperatingSystems(),
                'audiences': getAllAudiences()
            }

            // get the value of the selected split
            splitToApiCall[form.split_by_option].then(response => {
                if (axios.isAxiosError(response)) {
                    setParentFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setParentFormErrors([GenericErrorMessage])
                } else {
                    if (response.data) {
                        // when we get the data, we fill the dropdown of values
                        setSplitValues(response.data);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.split_by_option]);

    useEffect(() => {
        if (splitValues.length > 0) {
            setReloadSplitValues(true);
        }
    }, [splitValues])

    useEffect(() => {
        let splits : any[] = [];

        if(parentForm.splits) {
            splits = [...parentForm.splits];
        }

        if (splits.length > index) {
            splits[index] = form;

            setParentForm({...parentForm, splits: splits});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.split_by_value])

    const handleDelete = (e: any) => {
        // first we need to update the parent form by removing the current
        // row from it
        let splits : any[] = [];

        if(parentForm.splits) {
            splits = [...parentForm.splits];
        }

        if (splits.length > index) {
            splits.splice(index, 1);

            setParentForm({...parentForm, splits: splits});
        }
    }

    return (
        <Row className="mb-4">
            <Col md={4}>
                <Select name="split_by_option"
                        options={[{id: 'devices', name: 'Devices'}, {
                            id: 'languages',
                            name: 'Languages'
                        }]}
                        value={[{id: 'devices', name: 'Devices'}, {
                            id: 'languages',
                            name: 'Languages'
                        }].filter((option) => option.id === form.split_by_option)[0]}
                        getOptionLabel={(splitOption) => splitOption.name}
                        getOptionValue={(splitOption) => splitOption.id.toString()}
                        placeholder='Split format by'
                        onChange={onChangeSplitOption}/>
            </Col>

            <Col md={4}>
                <MultiSelect isResourceLoaded={reloadSplitValues} options={splitValues}
                             value={splitValues.filter((option) => form.split_by_value.includes(option.id))}
                             defaultValue={undefined} form={form} setForm={setForm}
                             name='split_by_value'/>
            </Col>

            <Col md={4}>
                {/*when we click on the trash icon, we need to delete the current row, and we need to*/}
                {/*remove the row from the parent form*/}
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete split</Tooltip>}>
                    <Button className='btn-sm btn-icon mt-1' variant='active-light-danger'
                            onClick={handleDelete}>
                        <i className={'fa-duotone fs-3 text-danger fa-trash'}></i>
                    </Button>
                </OverlayTrigger>
            </Col>
        </Row>
    )
}

export default FormatSplitRepeater;