import React, {useEffect, useRef, useState} from 'react';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {ErrorMessage, Form, Formik} from 'formik';
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel';
import KrysFormFooter from '../../../../../components/forms/KrysFormFooter';
import {useCampaign} from '../../core/CampaignContext';
import {
    CampaignOwnershipFormFields, CampaignOwnershipSchema,
    defaultCampaignOwnershipFormFields
} from '../../core/edit/ownership/form';
import {
    GenericErrorMessage,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from '../../../../../helpers/form';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import axios from 'axios';
import {extractErrors} from '../../../../../helpers/requests';
import Select from 'react-select';
import {User} from '../../../../../models/iam/User';
import {getAllUsers} from '../../../../../requests/iam/User';
import {CampaignOwnershipColumns} from '../../core/edit/ownership/TableColumns';
import {getCampaignOwners, storeCampaignOwner} from '../../../../../requests/demand/CampaignOwner';
import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../../../../helpers/variables';
import KrysSwitch from '../../../../../components/forms/KrysSwitch';

const EditOwnership: React.FC = () => {
    const {campaign} = useCampaign();

    const krysApp = useKrysApp();

    const [form, setForm] = useState<CampaignOwnershipFormFields>(defaultCampaignOwnershipFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [demandUsers, setDemandUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const onChangeHandler = (e: any) => {
        // as long as we are updating the create form, we should set the table refresh to false
        setRefreshTable(false);

        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        genericOnChangeHandler(e, form, setForm);
    };

    useEffect(() => {
        // get all the demand users
        getAllUsers('filter[roles][]=11&filter[roles][]=10').then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setDemandUsers(response.data);
                }
            }
        });

        // get all users regardless of role
        getAllUsers('filter[user_type]=internal').then(response => {
            if (axios.isAxiosError(response)) {
                setFormErrors(extractErrors(response));
            } else if (response === undefined) {
                setFormErrors([GenericErrorMessage])
            } else {
                if (response.data) {
                    setAllUsers(response.data);
                }
            }
        });
    }, []);

    const handleCreate = (e: any) => {
        if (campaign) {
            // send API request to create the advertiser
            storeCampaignOwner(campaign, form).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        setFormErrors(extractErrors(response));
                    } else if (response === undefined) {
                        // show generic error message
                        setFormErrors([GenericErrorMessage])
                    } else {
                        // we were able to store the advertiser
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('campaign owner', Actions.CREATE, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        });

                        // now that we have a new record successfully we need to refresh the table
                        setRefreshTable(true);

                        // we need to clear the form data
                        setForm(defaultCampaignOwnershipFormFields);

                        // clear the form
                        usersSelectRef.current?.clearValue();
                    }
                }
            );
        }
    };

    const usersSelectRef = useRef<any>(null);

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardHeader text='Assign new owner'/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CampaignOwnershipSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler}>
                                <div className="mb-7">
                                    <KrysFormLabel text="Is the owner part of demand?" isRequired={true}/>

                                    <KrysSwitch name="is_owner_demand"
                                                  onChangeHandler={(e) => {
                                                      e.stopPropagation();
                                                      setForm({
                                                          ...form,
                                                          is_owner_demand: Number(!form.is_owner_demand)
                                                      });
                                                  }}
                                                  defaultValue={Boolean(form.is_owner_demand)}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="is_owner_demand" className="mt-2"/>
                                    </div>
                                </div>

                                {
                                    Boolean(form.is_owner_demand) &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="Demand users" isRequired={true}/>

                                        <Select name="owner_id"
                                                options={demandUsers}
                                                getOptionLabel={(user) => user.name}
                                                getOptionValue={(user) => user.id.toString()}
                                                placeholder='Choose owner'
                                                ref={usersSelectRef}
                                                onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'owner_id')}/>

                                        <div className="mt-3 text-danger">
                                            {formik.errors?.owner_id ? formik.errors?.owner_id : null}
                                        </div>
                                    </div>
                                }

                                {
                                    !Boolean(form.is_owner_demand) &&
                                    <div className="mb-7">
                                        <KrysFormLabel text="All users" isRequired={true}/>

                                        <Select name="owner_id"
                                                options={allUsers}
                                                getOptionLabel={(user) => user.name}
                                                getOptionValue={(user) => user.id.toString()}
                                                placeholder='Choose owner'
                                                onChange={(e) => genericSingleSelectOnChangeHandler(e, form, setForm, 'owner_id')}/>

                                        <div className="mt-3 text-danger">
                                            {formik.errors?.owner_id ? formik.errors?.owner_id : null}
                                        </div>
                                    </div>
                                }

                                <KrysFormFooter cancelUrl={'/demand/advertisers'}/>
                            </Form>
                        )
                    }
                </Formik>

                <div className="separator separator-dashed my-10"></div>

                {
                    campaign ? <KrysInnerTable
                        doRefetch={refreshTable}
                        showSearchFilter={false}
                        slug="campaign-ownership"
                        queryId={QUERIES.CAMPAIGN_OWNERSHIP_LIST}
                        requestFunction={getCampaignOwners}
                        requestId={campaign.id} columnsArray={CampaignOwnershipColumns}
                    ></KrysInnerTable> : <></>
                }

            </KTCardBody>
        </KTCard>
    );
};

export default EditOwnership;