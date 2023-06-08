import axios from 'axios'
import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers'
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
}

const defaultPublicationEditContext = {
  publication: null,
  setPublication: () => {},
  refresh: false,
  setRefresh: () => {},
  handleRefresh: () => {},
  editOptions: DEFAULT_PUBLICATION_EDIT_OPTIONS,
  setEditOptions: () => {},
}

export const PublicationEditContext = createContext<Props>(defaultPublicationEditContext)

export const usePublicationEdit = () => {
  return useContext(PublicationEditContext)
}

export const PublicationEditProvider: FC<WithChildren> = ({children}) => {
  const [publication, setPublication] = useState<Publication | null>(null)
  const [refresh, setRefresh] = useState<boolean>(false)

  const [editOptions, setEditOptions] = useState<PublicationEditOptions>(
    DEFAULT_PUBLICATION_EDIT_OPTIONS
  )

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    // get the list of all publication edit options
    getPublicationEditOptions().then((response) => {
      // if we were able to get the list of publication edit options, then we fill our state with them
      if (!axios.isAxiosError(response) && response !== undefined) {
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
      }}
    >
      {children}
    </PublicationEditContext.Provider>
  )
}
