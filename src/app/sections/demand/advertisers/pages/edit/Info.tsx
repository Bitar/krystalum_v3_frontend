import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import {Advertiser} from '../../../../../models/demand/Advertiser';
import {defaultUpdateInfoFormFields, UpdateAdvertiserSchema, UpdateInfoFormFields} from '../../core/form';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {
    GenericErrorMessage, genericHandleSingleFile,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../helpers/form';
import {updateAdvertiser} from '../../../../../requests/demand/Advertiser';
import {extractErrors} from '../../../../../helpers/requests';
import {AlertMessageGenerator} from '../../../../../helpers/alertMessageGenerator';
import {Actions, KrysToastType, PageTypes} from '../../../../../helpers/variables';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import Select from 'react-select';
import {generatePageTitle} from '../../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../../helpers/sections';
import {filterData} from '../../../../../helpers/dataManipulation';
import {getAllCountries} from '../../../../../requests/misc/Country';
import {Country} from '../../../../../models/misc/Country';
import {AdvertiserIndustry} from '../../../../../models/misc/AdvertiserIndustry';
import {getAllAdvertiserIndustries} from '../../../../../requests/misc/AdvertiserIndustry';
import SingleSelect from '../../../../../components/forms/SingleSelect';

interface Props {
    advertiser: Advertiser | null
}

const AdvertiserInfoEdit: React.FC<Props> = ({advertiser}) => {
    const [form, setForm] = useState<UpdateInfoFormFields>(defaultUpdateInfoFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isResourceLoaded, setIsResourceLoaded] = useState<boolean>(false)

    const [countries, setCountries] = useState<Country[]>([]);
    const [industries, setIndustries] = useState<AdvertiserIndustry[]>([]);

    const krysApp = useKrysApp();

    const navigate = useNavigate();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_ADVERTISERS, PageTypes.EDIT));

        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of regions, then we fill our state with them
                if (response.data) {
                    setCountries(filterData(response.data, 'name', 'All Countries'));
                }
            }
        });

        getAllAdvertiserIndustries().then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                // if we were able to get the list of regions, then we fill our state with them
                if (response.data) {
                    setIndustries(response.data);
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (advertiser) {
            setIsResourceLoaded(true);

            // we set the Edit Info Form based on the advertiser data
            let advertiserForm: UpdateInfoFormFields = {name: advertiser.name};

            if (advertiser.info) {
                advertiserForm.hq_address = advertiser.info?.address;
                advertiserForm.hq_country_id = advertiser.info?.country.id;

                if (advertiser.info.industry) {
                    advertiserForm.industry_id = advertiser.info?.industry?.id;
                }
            }

            setForm(advertiserForm);
        }
    }, [advertiser]);

    const onChangeHandler = (e: any) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name

        if (e.target.name !== 'trade_license') {
            genericOnChangeHandler(e, form, setForm);
        }
    };

    const handleFile = (e: any, formik: FormikProps<any>) => {
        genericHandleSingleFile(e, formik, form, setForm, 'trade_license');
    };

    const handleEdit = (e: any) => {
        if (advertiser) {
            // send API request to create the advertiser
            updateAdvertiser(advertiser.id, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the advertiser
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('advertiser', Actions.EDIT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // navigate(`/demand/advertisers`);
                    }
                }
            );
        }
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={UpdateAdvertiserSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter full name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="HQ Address" isRequired={true}/>

                                    <Field className="form-control fs-6" type="text"
                                           placeholder="Enter HQ full address" name="hq_address"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="hq_address" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="HQ Country" isRequired={true}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={countries} defaultValue={advertiser?.info?.country} form={form} setForm={setForm} name='hq_country_id' />

                                    <div className="mt-1 text-danger">
                                        <div className="mt-2">
                                            {formik.errors?.hq_country_id ? formik.errors?.hq_country_id : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Industry" isRequired={false}/>

                                    <SingleSelect isResourceLoaded={isResourceLoaded} options={industries} defaultValue={advertiser?.info?.industry} form={form} setForm={setForm} name='industry_id' isClearable={true} />

                                    <div className="mt-1 text-danger">
                                        <div className="mt-2">
                                            {formik.errors?.industry_id ? formik.errors?.industry_id : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <KrysFormLabel text="Trade license" isRequired={false}/>

                                    <Field className="form-control fs-6" type="file" name="trade_license"
                                           value={undefined}
                                           onChange={(e: any) => handleFile(e, formik)}/>

                                    {
                                        advertiser?.info?.tradeLicensePath &&

                                        // TODO create a component that on click downloads href file
                                        <a href={advertiser?.info?.tradeLicensePath}
                                           target="_blank"
                                           className="d-flex align-items-center text-muted text-hover-krys py-1 mt-3"
                                           style={{wordBreak: "break-word"}}>
                                            <i className="fa-solid fa-download text-warning me-2"></i> <span className="pt-1">Download
                                            trade license </span>
                                        </a>
                                    }

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="trade_license" className="mt-2"/>
                                    </div>
                                </div>

                                <KrysFormFooter cancelUrl={'/demand/advertisers'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    );
};

export default AdvertiserInfoEdit;