import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {exportDevices, getDevices} from '../../../../requests/misc/Device';
import DeviceIndexFilter from '../partials/IndexFilter';
import {DevicesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const DeviceIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_DEVICES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.DEVICES_LIST} requestFunction={getDevices}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='device'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Devices' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportDevices),
                                          new FilterCardAction('devices-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/devices')]}/>

                        <KTCardBody>
                            <DeviceIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <DeviceTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const DeviceTable = () => {
    const devices = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => devices, [devices]);
    const columns = useMemo(() => DevicesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={devices.length > 0 ? devices[0] : null} isLoading={isLoading}/>
    )
}

export default DeviceIndex;
