import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useEffect} from "react";
import {generatePageTitle} from "../../helpers/pageTitleUtils";
import {PageTypes} from "../../helpers/variables";
import {useKrys} from "../../modules/general/KrysProvider";
import {Modules} from "../../helpers/modules";

const DashboardPage = () => {
    const krys = useKrys();

    useEffect(() => {
        krys.setPageTitle(generatePageTitle(Modules.DASHBOARD, PageTypes.INDEX))
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
