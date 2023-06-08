import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers'
import {Publisher} from '../../../../models/supply/publisher/Publisher'

interface Props {
  publisher: Publisher | null
  setPublisher: Dispatch<SetStateAction<Publisher | null>>
}

const defaultPublisherEditContext = {
  publisher: null,
  setPublisher: () => {},
}

export const PublisherEditContext = createContext<Props>(defaultPublisherEditContext)

export const usePublisherEdit = () => {
  return useContext(PublisherEditContext)
}

export const PublisherEditProvider: FC<WithChildren> = ({children}) => {
  const [publisher, setPublisher] = useState<Publisher | null>(null)

  return (
    <PublisherEditContext.Provider
      value={{
        publisher,
        setPublisher,
      }}
    >
      {children}
    </PublisherEditContext.Provider>
  )
}
