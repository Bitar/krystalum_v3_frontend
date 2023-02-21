import {
    FC,
    useState,
    useEffect,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react'
import {WithChildren} from '../../../_metronic/helpers';
import toast, {Toaster, ToastType} from 'react-hot-toast';

interface Alert {
    message: string;
    type: ToastType;
}

type KrysContextProps = {
    alert: Alert | undefined
    setAlert: Dispatch<SetStateAction<Alert | undefined>>,
    pageTitle: string,
    setPageTitle: Dispatch<SetStateAction<string>>,
}

const iniKrysContextPropsState = {
    alert: undefined,
    setAlert: () => {
    },
    pageTitle: '',
    setPageTitle: () => {
    },
}

const KrysContext = createContext<KrysContextProps>(iniKrysContextPropsState)

const useKrys = () => {
    return useContext(KrysContext)
}

const KrysProvider: FC<WithChildren> = ({children}) => {
    const [alert, setAlert] = useState<Alert | undefined>(undefined)
    const [pageTitle, setPageTitle] = useState<string>('')

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <KrysContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
            {children}
            {alert && (
                (toast as any)[alert.type](alert.message, {
                    position: 'top-center'
                })
            )}
            <Toaster
                position='top-center'
            />
        </KrysContext.Provider>
    )
}

export {KrysProvider, useKrys}