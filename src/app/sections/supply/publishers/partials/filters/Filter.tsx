import {Field, Form, Formik} from 'formik'
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {Col, Collapse, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {DateRangePicker} from 'rsuite'
import {DateRange} from 'rsuite/DateRangePicker'
import FilterFormFooter from '../../../../../components/forms/FilterFormFooter'
import KrysFormLabel from '../../../../../components/forms/KrysFormLabel'
import {RoleEnum} from '../../../../../enums/RoleEnum'
import {createDateFromString} from '../../../../../helpers/dateFormatter'
import {
  genericDateRangeOnChangeHandler,
  genericFilterHandler,
  genericMultiSelectOnChangeHandler,
  genericOnChangeHandler,
} from '../../../../../helpers/form'
import {getErrorPage, submitRequest} from '../../../../../helpers/requests'
import {User} from '../../../../../models/iam/User'
import {useAuth} from '../../../../../modules/auth'
import {useQueryRequest} from '../../../../../modules/table/QueryRequestProvider'
import {getAllUsers} from '../../../../../requests/iam/User'
import {FilterSchema} from '../../../publications/core/filterForm'
import {usePublisher} from '../../core/PublisherContext'

interface Props {
  showFilter: boolean
  setExportQuery: Dispatch<SetStateAction<string>>
  filters: any
  setFilters: Dispatch<SetStateAction<any>>
}

const PublisherFilter: React.FC<Props> = ({showFilter, setExportQuery, filters, setFilters}) => {
  const {currentUser, hasAnyRoles} = useAuth()
  const {options} = usePublisher()

  const {updateState} = useQueryRequest()
  const navigate = useNavigate()

  const [accountManagers, setAccountManagers] = useState<User[]>([])

  const [reset, setReset] = useState<boolean>(false)

  const {countries, regions, tiers} = options

  useEffect(() => {
    if (!hasAnyRoles(currentUser, [RoleEnum.PUBLISHER])) {
      // get all the account manager users
      submitRequest(getAllUsers, ['filter[roles][]=12&filter[roles][]=5'], (response) => {
        let errorPage = getErrorPage(response)

        if (errorPage) {
          navigate(errorPage)
        } else {
          setAccountManagers(response)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const multiSelectChangeHandler = (e: any, key: string) => {
    if (!reset) {
      if (key === 'countries_ids') {
        setFilters({...filters, countries_ids: e.map((entity: any) => entity.id), regions_ids: []})
      } else {
        genericMultiSelectOnChangeHandler(e, filters, setFilters, key)
      }
    }
  }

  const dateRangeChangeHandler = (date: DateRange | null, key: string) => {
    genericDateRangeOnChangeHandler(date, filters, setFilters, key)
  }

  const onChangeHandler = (e: any) => {
    genericOnChangeHandler(e, filters, setFilters)
  }

  const handleFilter = () => {
    genericFilterHandler(setExportQuery, filters, updateState, reset)
  }

  useEffect(() => {
    handleFilter()

    tiersSelectRef.current?.clearValue()
    countriesSelectRef.current?.clearValue()
    regionsSelectRef.current?.clearValue()
    accountManagersSelectRef.current?.clearValue()

    setReset(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  useEffect(() => {
    // we also need to clear the values of the regions select fields
    // when the country select changes
    regionsSelectRef.current?.clearValue()
  }, [filters.countries_ids])

  const resetFilter = () => {
    setFilters({...{}, is_archived: filters['is_archived']})
    setReset(true)
  }

  const tiersSelectRef = useRef<any>(null)
  const countriesSelectRef = useRef<any>(null)
  const regionsSelectRef = useRef<any>(null)
  const accountManagersSelectRef = useRef<any>(null)
  const integrationDateRangeRef = useRef<any>(null)

  return (
    <Collapse in={showFilter}>
      <Row id='#publishers-list-filter'>
        <Col>
          <div className='card card-rounded bg-primary bg-opacity-5 p-10 mb-15'>
            <Formik
              initialValues={{}}
              validationSchema={FilterSchema}
              onSubmit={handleFilter}
              enableReinitialize
            >
              {
                <Form onChange={onChangeHandler}>
                  <Row>
                    <Col md={4}>
                      <KrysFormLabel text='Name' isRequired={false} />

                      <Field
                        className='form-control fs-base'
                        type='text'
                        value={filters.name ?? ''}
                        placeholder='Filter by name'
                        name='name'
                      />
                    </Col>

                    <Col md={4}>
                      <KrysFormLabel text='HQ Country(ies)' isRequired={false} />

                      <Select
                        isMulti
                        name='countries_ids'
                        options={countries}
                        getOptionLabel={(instance) => instance.name}
                        getOptionValue={(instance) => instance.id.toString()}
                        onChange={(e) => multiSelectChangeHandler(e, 'countries_ids')}
                        ref={countriesSelectRef}
                        placeholder='Filter by country(ies)'
                      />
                    </Col>

                    <Col md={4}>
                      <KrysFormLabel text='HQ Region(s)' isRequired={false} />

                      <Select
                        isMulti
                        name='regions_ids'
                        options={regions}
                        getOptionLabel={(instance) => instance.name}
                        getOptionValue={(instance) => instance.id.toString()}
                        onChange={(e) => multiSelectChangeHandler(e, 'regions_ids')}
                        ref={regionsSelectRef}
                        placeholder='Filter by region(s)'
                        isDisabled={!!(filters?.countries_ids && filters?.countries_ids.length > 0)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <KrysFormLabel text='Tier(s)' isRequired={false} />

                      <Select
                        isMulti
                        name='tiers_ids'
                        options={tiers}
                        getOptionLabel={(instance) => instance.name}
                        getOptionValue={(instance) => instance.id.toString()}
                        onChange={(e) => multiSelectChangeHandler(e, 'tiers_ids')}
                        ref={tiersSelectRef}
                        placeholder='Filter by tier(s)'
                      />
                    </Col>

                    <Col md={4}>
                      <KrysFormLabel text='Integration Date' isRequired={false} />

                      <DateRangePicker
                        name='integration_date_range'
                        placeholder='Filter by integration date range'
                        className='krys-datepicker krys-daterangepicker'
                        block
                        isoWeek
                        onChange={(date) => {
                          dateRangeChangeHandler(date, 'integration_date_range')
                        }}
                        value={
                          filters.integration_date_range
                            ? [
                                createDateFromString(filters.integration_date_range.split(',')[0]),
                                createDateFromString(filters.integration_date_range.split(',')[1]),
                              ]
                            : null
                        }
                        ref={integrationDateRangeRef}
                      />
                    </Col>

                    {!hasAnyRoles(currentUser, [RoleEnum.PUBLISHER]) && (
                      <Col md={4}>
                        <KrysFormLabel text='Account Manager(s)' isRequired={false} />

                        <Select
                          isMulti
                          name='account_managers_ids'
                          options={accountManagers}
                          getOptionLabel={(instance) => instance.name}
                          getOptionValue={(instance) => instance.id.toString()}
                          onChange={(e) => multiSelectChangeHandler(e, 'account_managers_ids')}
                          ref={accountManagersSelectRef}
                          placeholder='Filter by account manager(s)'
                        />
                      </Col>
                    )}
                  </Row>

                  <FilterFormFooter resetFilter={resetFilter} />
                </Form>
              }
            </Formik>
          </div>
        </Col>
      </Row>
    </Collapse>
  )
}

export default PublisherFilter
