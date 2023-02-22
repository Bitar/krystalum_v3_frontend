import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useEffect} from "react";
import {generatePageTitle} from "../../helpers/pageTitleGenerator";
import {PageTypes} from "../../helpers/variables";
import {useKrysApp} from "../../modules/general/KrysApp";
import {Sections} from "../../helpers/sections";

const DashboardPage = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DASHBOARD, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
