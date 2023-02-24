import React, {useEffect, useMemo, useState} from 'react';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import KrysTable from '../../../../components/tables/KrysTable';
import {VideoPlayersColumns} from '../core/TableColumns';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {getVideoPlayers} from '../../../../requests/misc/VideoPlayer';
import VideoPlayerIndexFilter from '../partials/IndexFilter';

const VideoPlayerIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VIDEO_PLAYERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.VIDEO_PLAYERS_LIST} requestFunction={getVideoPlayers}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Video Players' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[{
                                          type: Actions.FILTER,
                                          target: 'video-players-list-filter',
                                          showFilter: showFilter,
                                          setShowFilter: setShowFilter
                                      }, {type: Actions.CREATE, url: '/misc/video-players'}]}/>

                        <KTCardBody>
                            <VideoPlayerIndexFilter showFilter={showFilter}/>

                            <VideoPlayerTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const VideoPlayerTable = () => {
    const videoPlayers = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => videoPlayers, [videoPlayers]);
    const columns = useMemo(() => VideoPlayersColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={videoPlayers.length > 0 ? videoPlayers[0] : null}
                   isLoading={isLoading}/>
    )
}

export default VideoPlayerIndex;