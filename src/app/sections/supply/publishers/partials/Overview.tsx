import React from 'react';

import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers';
import {formatDateToMonthDayYear} from '../../../../helpers/dateFormatter';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {usePublisher} from '../core/PublisherContext';

const PublisherOverview: React.FC = () => {
    const {publisher} = usePublisher();

    return (
        <KTCard className="mb-5">
            <KTCardBody>
                <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-2">
                                    <h2 className="text-gray-800 fs-2 fw-bolder me-1 mb-0">{publisher?.name}</h2>
                                    <KTSVG
                                        path="/media/icons/duotune/general/gen026.svg"
                                        className="svg-icon-2 svg-icon-primary align-top me-1"
                                    />
                                </div>

                                <div className="d-flex flex-wrap fs-6 mb-4 pe-2">
                                    {
                                        publisher?.info?.email &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Email address</Tooltip>}
                                        >
                                            <a href={`mailto:${publisher?.info?.email}`}
                                               className="d-flex align-items-center text-gray-400 text-hover-krys me-5 mb-2"
                                               data-toggle="tooltip" data-placement="top">
                                                <KTSVG
                                                    path="/media/icons/duotune/communication/com002.svg"
                                                    className="svg-icon-4 me-1"
                                                />{publisher?.info?.email}
                                            </a>
                                        </OverlayTrigger>
                                    }

                                    {
                                        publisher?.info?.hq_country &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>HQ country</Tooltip>}
                                        >
                                            <div
                                                className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                                <KTSVG
                                                    path="/media/icons/duotune/maps/map008.svg"
                                                    className="svg-icon-4 me-1"
                                                />{publisher?.info?.hq_country?.name}</div>
                                        </OverlayTrigger>
                                    }

                                    {
                                        publisher?.integration_date &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Integration date</Tooltip>}
                                        >
                                            <div
                                                className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                                <KTSVG
                                                    path="/media/icons/duotune/general/gen014.svg"
                                                    className="svg-icon-4 me-1"
                                                />{formatDateToMonthDayYear(publisher?.integration_date)}</div>
                                        </OverlayTrigger>
                                    }
                                </div>

                                {
                                    publisher?.info?.hq_address &&
                                    <div className="d-flex flex-wrap text-gray-600 fs-6 mb-4 pe-2">
                                        <span className="fw-bold">Address:</span>&nbsp;{publisher?.info?.hq_address}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-wrap flex-stack">
                            <div className="d-flex flex-column flex-grow-1 pe-8">
                                <div className="d-flex flex-wrap">
                                    {
                                        publisher?.revenue_share &&
                                        <div
                                            className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <KTSVG
                                                    path="/media/icons/duotune/finance/fin008.svg"
                                                    className="svg-icon-1 svg-icon-success me-2"
                                                />
                                                <div className="fs-5 fw-bold">{publisher?.revenue_share}%</div>
                                            </div>
                                            <div className="fw-bold fs-6 text-gray-400">Revenue share</div>
                                        </div>
                                    }

                                    {
                                        publisher?.commitment &&
                                        <div
                                            className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <KTSVG
                                                    path="/media/icons/duotune/finance/fin006.svg"
                                                    className="svg-icon-1 svg-icon-success me-2"
                                                />
                                                <div className="fs-5 fw-bold">{publisher?.commitment}</div>
                                            </div>
                                            <div className="fw-bold fs-6 text-gray-400">Commitment</div>
                                        </div>
                                    }

                                    {
                                        publisher?.tier &&
                                        <div
                                            className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <KTSVG
                                                    path="/media/icons/duotune/abstract/abs024.svg"
                                                    className="svg-icon-1 svg-icon-warning me-2"
                                                />
                                                <div className="fs-5 fw-bold">{publisher?.tier.name}</div>
                                            </div>
                                            <div className="fw-bold fs-6 text-gray-400">Tier</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherOverview;