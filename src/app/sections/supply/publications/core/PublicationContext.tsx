import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers'
import {submitRequest} from '../../../../helpers/requests'
import {DEFAULT_PUBLICATION_OPTIONS} from '../../../../helpers/settings'
import {PublicationOptions} from '../../../../models/supply/Options'
import {Publisher} from '../../../../models/supply/publisher/Publisher'
import {getPublicationOptions} from '../../../../requests/supply/Options'
import {getAllPublishers} from '../../../../requests/supply/publisher/Publisher'

interface Props {
  publishers: Publisher[]
  setPublishers: Dispatch<SetStateAction<Publisher[]>>
  options: PublicationOptions
  setOptions: Dispatch<SetStateAction<PublicationOptions>>
}

const defaultPublicationContext = {
  publishers: [],
  setPublishers: () => {},
  options: DEFAULT_PUBLICATION_OPTIONS,
  setOptions: () => {},
}

export const PublicationContext = createContext<Props>(defaultPublicationContext)

export const usePublication = () => {
  return useContext(PublicationContext)
}

export const PublicationProvider: FC<WithChildren> = ({children}) => {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [options, setOptions] = useState<PublicationOptions>(DEFAULT_PUBLICATION_OPTIONS)

  useEffect(() => {
    // get the list of all publishers
    submitRequest(getAllPublishers, [], (response) => {
      setPublishers(response)
    })

    // get the list of all publication options
    submitRequest(getPublicationOptions, [], (response) => {
      setOptions(response)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PublicationContext.Provider
      value={{
        publishers,
        setPublishers,
        options,
        setOptions,
      }}
    >
      {children}
    </PublicationContext.Provider>
  )
}
