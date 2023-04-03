import React, {useEffect, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {EXPORT_ENDPOINT, getPublications} from '../../../../requests/supply/publication/Publication';
import {PublicationsColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import PublicationIndexFilter from '../partials/IndexFilter';
import {Link} from 'react-router-dom';

const PublicationIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <KrysIndex queryId={QUERIES.PUBLICATIONS_LIST}
                       requestFunction={getPublications}
                       columnsArray={PublicationsColumns}
                       cardHeader={
                           {
                               text: 'All Publications',
                               icon: 'fa-regular fa-list',
                               icon_style: 'fs-3 text-primary',
                               actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                   new FilterCardAction('publications-list-filter', showFilter, setShowFilter),
                                   new CreateCardAction('/supply/publications', 'manage-supply')],
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublicationIndexFilter}
            ></KrysIndex>

            {/* Archived Publications */}
            <KTCard>
                <KTCardBody>
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="card h-175px bgi-no-repeat bgi-size-contain card-xl-stretch mb-5 mb-xl-8 krys-engage-1"
                                style={{
                                    backgroundColor: 'rgb(102, 50, 89)',
                                    backgroundPosition: 'right center',
                                    backgroundImage: 'url("/media/illustrations/sigma-1/5.png")'
                                    // backgroundImage: 'url("/media/svg/misc/hot-air-balloon.svg")'
                                    // backgroundImage: 'url("/media/svg/misc/taieri.svg")'
                                }}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h2 className="text-white fw-bold mb-1">Archived Publications</h2>
                                    <p className="text-white mb-5">Browse through the list of publications that don't have
                                        publications that are currently receiving inventory</p>
                                    <div className="m-0">
                                        <Link to={`/supply/publications/archived`}
                                              className="btn btn-danger fw-semibold px-6 py-3">
                                            Go to Archived Publications
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default PublicationIndex;