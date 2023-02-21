import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useEffect} from "react";
import {generatePageTitle} from "../../helpers/general";
import {DASHBOARD, IAM_PERMISSIONS} from "../../helpers/modules";
import {PageTypes} from "../../helpers/variables";
import {useKrys} from "../../modules/general/KrysProvider";

const DashboardPage = () => {
    const krys = useKrys();

    useEffect(() => {
        krys.setPageTitle(generatePageTitle(DASHBOARD, PageTypes.INDEX))
    }, []);

    return <></>
}

const DashboardWrapper = () => {
    const intl = useIntl()

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper};
