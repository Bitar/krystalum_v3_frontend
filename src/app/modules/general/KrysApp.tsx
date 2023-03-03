import {
    FC,
    useState,
    useEffect,
    createContext,
    useContext,
    Dispatch,
    SetStateAction
} from 'react'
import {WithChildren} from '../../../_metronic/helpers';
import toast, {Toaster, ToastType} from 'react-hot-toast';
import {KrysToastType} from '../../helpers/variables';

type Alert = {
    message: string;
    type: KrysToastType;
}

type KrysContextProps = {
    alert: Alert | undefined
    setAlert: Dispatch<SetStateAction<Alert | undefined>>,
    pageTitle: string,
    setPageTitle: Dispatch<SetStateAction<string>>,
}

const initKrysContextPropsState = {
    alert: undefined,
    setAlert: () => {
    },
    pageTitle: '',
    setPageTitle: () => {
    },
}

const KrysContext = createContext<KrysContextProps>(initKrysContextPropsState)

const useKrysApp = () => {
    return useContext(KrysContext)
}

const KrysApp: FC<WithChildren> = ({children}) => {
    const [alert, setAlert] = useState<Alert | undefined>(undefined)
    const [pageTitle, setPageTitle] = useState<string>('')

    const color = {
        'success': '#50cd89',
        'error': '#f1416c'
    }

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        if (alert !== undefined) {
            (toast as any)[alert.type](alert.message, {
                id: `alert-${alert.type}`,
                duration: 4000,
                position: 'top-center',
                style: {
                    border: '1px solid ' + (color as any)[alert.type],
                    padding: '16px',
                    color: '#000000',
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

    return (
        <KrysContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
            {children}
            <Toaster/>
        </KrysContext.Provider>
    )
}

export {KrysApp, useKrysApp}