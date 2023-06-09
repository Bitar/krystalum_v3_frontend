import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers'
import {submitRequest} from '../../../../helpers/requests'
import {DEFAULT_PUBLISHER_OPTIONS} from '../../../../helpers/settings'
import {PublisherOptions} from '../../../../models/supply/Options'
import {getPublisherOptions} from '../../../../requests/supply/Options'

interface Props {
  options: PublisherOptions
  setOptions: Dispatch<SetStateAction<PublisherOptions>>
}

const defaultPublisherContext = {
  options: DEFAULT_PUBLISHER_OPTIONS,
  setOptions: () => {},
}

export const PublisherContext = createContext<Props>(defaultPublisherContext)

export const usePublisher = () => {
  return useContext(PublisherContext)
}

export const PublisherProvider: FC<WithChildren> = ({children}) => {
  const [options, setOptions] = useState<PublisherOptions>(DEFAULT_PUBLISHER_OPTIONS)

  useEffect(() => {
    // get the list of all publisher options
    submitRequest(getPublisherOptions, [], (response) => {
      setOptions(response)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PublisherContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </PublisherContext.Provider>
  )
}
