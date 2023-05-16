import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FormatKpiField} from '../../../core/edit/orders/formats/formatKpiField';
import {Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import Select from 'react-select';
import {Kpi} from '../../../../../../models/misc/Kpi';
import {getAllKpis, getKpi} from '../../../../../../requests/misc/Kpi';
import axios from 'axios';
import {extractErrors} from '../../../../../../helpers/requests';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../../helpers/form';
import {Field} from 'formik';
import Button from 'react-bootstrap/Button';
import {CampaignOrderFormatFormFields} from '../../../core/edit/orders/formats/form';

interface Props {
    defaultValue: FormatKpiField,
    index: number,
    setParentForm: Dispatch<SetStateAction<any>>,
    parentForm: CampaignOrderFormatFormFields,
    setParentFormErrors: Dispatch<SetStateAction<any>>,
}

const FormatKpiRepeater: React.FC<Props> = ({defaultValue, index, setParentForm, parentForm, setParentFormErrors}) => {
    const [form, setForm] = useState<FormatKpiField>(defaultValue);
    const [isRateKpi, setIsRateKpi] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [kpisOptions, setKpisOptions] = useState<Kpi[]>([]);

    function doShowWarning(): boolean {
        // check if the kpi_target has %
        if (!form.kpi_target.includes('%')) {
            // check if the float val of the kpi_target is < 0
            if (parseFloat(form.kpi_target) < 1) {
                // we're in the case where the kpi_target doesn't have % and it's < 0
                return true
            }
        }

        return false;
    }

    useEffect(() => {
        setForm(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        // we need to fill the KPI options
        getAllKpis().then(response => {
            if (axios.isAxiosError(response)) {
                setParentFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setParentFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    // when we get the data, we fill the dropdown of values
                    setKpisOptions(response.data);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let kpis: any[] = [];

        if (parentForm.kpis) {
            kpis = [...parentForm.kpis];
        }

        if (kpis.length > index) {
            if(form.kpi_target !== '') {
                if (isRateKpi) {
                    setShowWarning(doShowWarning());
                }
            } else {
                setShowWarning(false);
            }

            kpis[index] = form;

            setParentForm({...parentForm, kpis: kpis});
        } else {
            // don't show a warning because there's no value
            setShowWarning(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.kpi_target])

    // when a kpi is selected, we get that kpi from the backend
    useEffect(() => {
        if (form.kpi_option && typeof form.kpi_option === 'number') {
            getKpi(form.kpi_option).then(response => {
                if (axios.isAxiosError(response)) {
                    setParentFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setParentFormErrors([GenericErrorMessage])
                } else {
                    if (response.is_rate) {
                        setIsRateKpi(true);

                        // check if there's already a target
                        // in this case we might need to show the warning message
                        // when the option changes from no rate to rate.
                        setShowWarning(doShowWarning());
                    } else {
                        setIsRateKpi(false);
                        setShowWarning(false);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.kpi_option])

    const handleDelete = (e: any) => {
        // first we need to update the parent form by removing the current
        // row from it
        let kpis: any[] = [];

        if (parentForm.kpis) {
            kpis = [...parentForm.kpis];
        }

        if (kpis.length > index) {
            kpis.splice(index, 1);

            setParentForm({...parentForm, kpis: kpis});
        }
    }

    return (
        <Row className="mb-4">
            <Col md={4}>
                <Select name="kpi_option"
                        options={kpisOptions}
                        value={kpisOptions.filter((option) => option.id === form.kpi_option)[0]}
                        getOptionLabel={(kpiOption) => kpiOption.name}
                        getOptionValue={(kpiOption) => kpiOption.id.toString()}
                        placeholder='Choose KPI'
                        onChange={(e) =>
                            genericSingleSelectOnChangeHandler(e, form, setForm, 'kpi_option')}/>
            </Col>

            <Col md={4}>
                <Field className="form-control fs-base" type="text"
                       value={form.kpi_target}
                       placeholder="Enter target for KPI" name="kpi_target" onChange={(e: any) => genericOnChangeHandler(e, form, setForm)
                }/>

                {
                    showWarning && <div className="alert alert-dismissible bg-light-warning p-5 mb-2 mt-2">
                        <div>
                            <div className="d-flex flex-column pe-0">
                                <span className='text-gray-700'><b>Warning.</b> This value will be counted as a fraction and not a percentage without the % symbol.</span>
                            </div>
                        </div>
                    </div>
                }
            </Col>

            <Col md={4}>
                {/*when we click on the trash icon, we need to delete the current row, and we need to*/}
                {/*remove the row from the parent form*/}
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete KPI</Tooltip>}>
                    <Button className='btn-sm btn-icon mt-1' variant='active-light-danger'
                            onClick={handleDelete}>
                        <i className={'fa-duotone fs-3 text-danger fa-trash'}></i>
                    </Button>
                </OverlayTrigger>
            </Col>
        </Row>
    );
}

export default FormatKpiRepeater