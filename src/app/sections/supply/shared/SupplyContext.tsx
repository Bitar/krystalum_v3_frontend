import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {WithChildren} from '../../../../_metronic/helpers'
import {Publisher} from '../../../models/supply/publisher/Publisher'

interface Props {
  publisher: Publisher | null
  setPublisher: Dispatch<SetStateAction<Publisher | null>>
  showPublisherAlert: boolean
  setShowPublisherAlert: Dispatch<SetStateAction<boolean>>
}

const defaultSupplyContext = {
  publisher: null,
  setPublisher: () => {},
  showPublisherAlert: false,
  setShowPublisherAlert: () => {},
}

export const SupplyContext = createContext<Props>(defaultSupplyContext)

export const useSupply = () => {
  return useContext(SupplyContext)
}

export const SupplyProvider: FC<WithChildren> = ({children}) => {
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [showPublisherAlert, setShowPublisherAlert] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/supply/publications/create') {
      setPublisher(null)
      setShowPublisherAlert(false)
    }
  }, [location])

  return (
    <SupplyContext.Provider
      value={{
        publisher,
        setPublisher,
        showPublisherAlert,
        setShowPublisherAlert,
      }}
    >
      {children}
    </SupplyContext.Provider>
  )
}
