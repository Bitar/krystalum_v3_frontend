import {
    FC,
    useState,
    useEffect,
    createContext,
    useContext,
    Dispatch,
    SetStateAction, useRef,
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

    useEffect(() => {
        if (alert != undefined) {
            (toast as any)[alert.type](alert.message, {
                id: `alert-${alert.type}`,
                duration: 2000,
                position: 'top-center'
            })

            setTimeout(() => {
                toast.dismiss();
                setAlert(undefined);
            }, 2000);
        }
    }, [alert]);

    return (
        <KrysContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
            {children}
            <Toaster/>
        </KrysContext.Provider>
    )
}

export {KrysProvider, useKrys}