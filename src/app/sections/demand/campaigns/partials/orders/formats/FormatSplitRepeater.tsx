import {Col, Row} from 'react-bootstrap';
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
import {defaultFormatSplitField, FormatSplitField} from '../../../core/edit/orders/formats/formatSplitField';

type SplitToApiCall = {
    [key: string]: Promise<any | AxiosError<any, any> | undefined>;
};

type Props = {
    index: number,
    setSplits: Dispatch<SetStateAction<any>>,
    parentSplits: FormatSplitField[],
    setParentFormErrors: Dispatch<SetStateAction<any>>,
}

const FormatSplitRepeater: React.FC<Props> = ({index, setSplits, parentSplits, setParentFormErrors}) => {
    const [form, setForm] = useState<FormatSplitField>(defaultFormatSplitField);

    const [splitValues, setSplitValues] = useState<any[]>([]);
    const [reloadSplitValues, setReloadSplitValues] = useState<boolean>(false);

    const onChangeSplitOption = (e: any) => {
        // do API call to fill the values
        setReloadSplitValues(false);

        genericSingleSelectOnChangeHandler(e, form, setForm, 'split_by_option');

        let splitToApiCall: SplitToApiCall = {
            'devices': getAllDevices(),
            'languages': getAllLanguages(),
            'operating-systems': getAllOperatingSystems(),
            'audiences': getAllAudiences()
        }

        // get the value of the selected split
        if(e) {
            splitToApiCall[e.id].then(response => {
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
    }

    useEffect(() => {
        if(splitValues.length > 0) {
            setReloadSplitValues(true);
        }
    }, [splitValues])

    useEffect(() => {
        let splits = [...parentSplits];

        if(splits.length > index) {
            splits[index] = form;

            setSplits(splits);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.split_by_value])

    return (
        <Row className="mb-4">
            <Col md={6}>
                <Select name="split_by_option"
                        options={[{id: 'devices', name: 'Devices'}, {
                            id: 'languages',
                            name: 'Languages'
                        }]}
                        getOptionLabel={(splitOption) => splitOption.name}
                        getOptionValue={(splitOption) => splitOption.id.toString()}
                        placeholder='Split format by'
                        onChange={onChangeSplitOption}/>
            </Col>

            <Col md={6}>
                <MultiSelect isResourceLoaded={reloadSplitValues} options={splitValues}
                             defaultValue={undefined} form={form} setForm={setForm}
                             name='split_by_value' />
            </Col>
        </Row>
    )
}

export default FormatSplitRepeater;