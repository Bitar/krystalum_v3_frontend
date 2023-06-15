import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {WithChildren} from '../../../../../_metronic/helpers'
import {getErrorPage, submitRequest} from '../../../../helpers/requests'
import {DEFAULT_PUBLICATION_EDIT_OPTIONS} from '../../../../helpers/settings'
import {PublicationEditOptions} from '../../../../models/supply/Options'
import {Publication} from '../../../../models/supply/publication/Publication'
import {getPublicationEditOptions} from '../../../../requests/supply/Options'

interface Props {
  publication: Publication | null
  setPublication: Dispatch<SetStateAction<Publication | null>>
  refresh: boolean | null
  setRefresh: Dispatch<SetStateAction<boolean>>
  handleRefresh: () => void
  editOptions: PublicationEditOptions
  setEditOptions: Dispatch<SetStateAction<PublicationEditOptions>>
  tabActiveKey: string
  setTabActiveKey: Dispatch<SetStateAction<string>>
}

const defaultPublicationEditContext = {
  publication: null,
  setPublication: () => {},
  refresh: false,
  setRefresh: () => {},
  handleRefresh: () => {},
  editOptions: DEFAULT_PUBLICATION_EDIT_OPTIONS,
  setEditOptions: () => {},
  tabActiveKey: '',
  setTabActiveKey: () => {},
}

export const PublicationEditContext = createContext<Props>(defaultPublicationEditContext)

export const usePublicationEdit = () => {
  return useContext(PublicationEditContext)
}

export const PublicationEditProvider: FC<WithChildren> = ({children}) => {
  const navigate = useNavigate()

  const [publication, setPublication] = useState<Publication | null>(null)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [editOptions, setEditOptions] = useState<PublicationEditOptions>(
    DEFAULT_PUBLICATION_EDIT_OPTIONS
  )
  const [tabActiveKey, setTabActiveKey] = useState<string>('')

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    // get the list of all publication edit options
    submitRequest(getPublicationEditOptions, [], (response) => {
      let errorPage = getErrorPage(response)

      if (errorPage) {
        navigate(errorPage)
      } else {
        setEditOptions(response)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PublicationEditContext.Provider
      value={{
        publication,
        setPublication,
        refresh,
        setRefresh,
        handleRefresh,
        editOptions,
        setEditOptions,
        tabActiveKey,
        setTabActiveKey,
      }}
    >
      {children}
    </PublicationEditContext.Provider>
  )
}
