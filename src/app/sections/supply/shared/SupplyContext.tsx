import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {WithChildren} from '../../../../_metronic/helpers'
import {Publisher} from '../../../models/supply/publisher/Publisher'

interface Props {
  publisher: Publisher | null
  setPublisher: Dispatch<SetStateAction<Publisher | null>>
}

const defaultSupplyContext = {
  publisher: null,
  setPublisher: () => {},
}

export const SupplyContext = createContext<Props>(defaultSupplyContext)

export const useSupply = () => {
  return useContext(SupplyContext)
}

export const SupplyProvider: FC<WithChildren> = ({children}) => {
  const [publisher, setPublisher] = useState<Publisher | null>(null)

  return (
    <SupplyContext.Provider
      value={{
        publisher,
        setPublisher,
      }}
    >
      {children}
    </SupplyContext.Provider>
  )
}
