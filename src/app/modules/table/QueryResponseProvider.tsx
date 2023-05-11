/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {useQueryRequest} from './QueryRequestProvider'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  stringifyRequestQuery,
} from '../../../_metronic/helpers'

type Props = {
  id: string
  requestFunction: any
  requestId?: number | string,
  requestQuery?: string,
}

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<React.PropsWithChildren<Props>> = ({
  id,
  requestFunction,
  requestId, requestQuery,
  children,
}) => {
  const {state} = useQueryRequest()

  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [query, updatedQuery])

  useEffect(() => {
    const updatedQuery = requestQuery + '&' + query;
    setQuery(updatedQuery)
  }, [requestQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${id}-${query}`,
    () => {
      if (requestQuery) {
        requestQuery += '&' + query
      } else {
        requestQuery = query
      }

      if (requestId) {
        return requestFunction(requestId, requestQuery)
      } else {
        return requestFunction(requestQuery)
      }
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false, enabled: true}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.meta) {
    return defaultPaginationState
  }

  return response.meta
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
