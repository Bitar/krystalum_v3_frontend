/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from './QueryResponseProvider'
import {useQueryRequest} from './QueryRequestProvider'
import {FC} from 'react'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const TableListPagination = ({numbers = true}) => {
  const pagination = useQueryResponsePagination()

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <ul className='pagination'>
          {pagination.links
            ?.map((link: any) => {
              return {...link, label: mappedLabel(link.label)}
            })
            .map((link: any, index: number) =>
              !numbers ? (
                (link.label === 'Previous' || link.label === 'Next') && (
                  <PaginationItem key={`pagination-key-${index}`} link={link} />
                )
              ) : (
                <PaginationItem key={`pagination-key-${index}`} link={link} />
              )
            )}
        </ul>
      </div>
    </div>
  )
}

const PaginationItem: FC<{link: any}> = ({link}) => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()

  const updatePage = (page: number | undefined) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page, per_page: pagination.per_page || 10})
  }

  const currentPage = (link: any) => {
    if (link.url) {
      const url = new URL(link.url)
      let pageNumber = url.searchParams.get('page')
      if (pageNumber) {
        return parseInt(pageNumber)
      }
    }
  }

  return (
    <li
      key={link.label}
      className={clsx('page-item', {
        active: link.active,
        disabled: isLoading,
        previous: link.label === 'Previous',
        next: link.label === 'Next',
      })}
    >
      <a
        className={clsx('page-link', {
          'page-text': link.label === 'Previous' || link.label === 'Next',
          'me-5': link.label === 'Previous',
        })}
        onClick={() => updatePage(currentPage(link))}
        style={{cursor: 'pointer'}}
      >
        {mappedLabel(link.label)}
      </a>
    </li>
  )
}

export {TableListPagination}
