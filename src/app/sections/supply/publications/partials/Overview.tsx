import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers';
import {REVENUE_TYPE} from '../../../../enums/Supply/RevenueType';
import {formatDateToMonthDayYear} from '../../../../helpers/dateFormatter';
import {Language} from '../../../../models/misc/Language';
import {BadgesCell} from '../../../../modules/table/columns/BadgesCell';
import {usePublication} from '../core/PublicationContext';

const PublisherOverview: React.FC = () => {
    const {publication} = usePublication();

    return (
        <KTCard className="mb-5">
            <KTCardBody>
                <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-2">
                                    <h2 className="text-gray-800 fs-2 fw-bolder me-1 mb-0">{publication?.name}</h2>
                                    {
                                        publication?.unique_identifier ?
                                            <BadgesCell texts={[publication?.unique_identifier]} color="light-info"
                                                        align="left"/>
                                            : <></>
                                    }
                                </div>

                                <div className="d-flex flex-wrap fs-6 mb-4 pe-2">
                                    {
                                        publication?.publisher?.name &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Publisher</Tooltip>}
                                        >
                                            <div
                                                className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                                <KTSVG
                                                    path="/media/icons/duotune/communication/com001.svg"
                                                    className="svg-icon-4 me-1"
                                                />{publication?.publisher?.name}
                                            </div>
                                        </OverlayTrigger>
                                    }

                                    {
                                        publication?.info?.url &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Website URL</Tooltip>}
                                        >
                                            <a href={publication?.info?.url}
                                               className="d-flex align-items-center text-gray-400 me-5 mb-2 text-hover-krys">
                                                <KTSVG
                                                    path="/media/icons/duotune/coding/cod008.svg"
                                                    className="svg-icon-4 me-1"
                                                />{publication?.info?.url}</a>
                                        </OverlayTrigger>
                                    }

                                    {
                                        publication?.languages &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Languages</Tooltip>}
                                        >
                                            <div
                                                className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                                <KTSVG
                                                    path="/media/icons/duotune/communication/com003.svg"
                                                    className="svg-icon-4 me-1"
                                                />{publication?.languages.map((language: Language) => language.name).join(', ')}
                                            </div>
                                        </OverlayTrigger>
                                    }

                                    {
                                        publication?.live_date &&
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Live date</Tooltip>}
                                        >
                                            <div
                                                className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                                <KTSVG
                                                    path="/media/icons/duotune/general/gen014.svg"
                                                    className="svg-icon-4 me-1"
                                                />{formatDateToMonthDayYear(publication?.live_date)}</div>
                                        </OverlayTrigger>
                                    }

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Is Deal PMP?</Tooltip>}
                                    >
                                        <div
                                            className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                            <KTSVG
                                                path="/media/icons/duotune/general/gen005.svg"
                                                className="svg-icon-4 me-1"
                                            />Deal PMP: &nbsp; {publication?.is_deal_pmp ?
                                            <BadgesCell texts={['Yes']} color="light-success"
                                                        align="left"/> : <BadgesCell texts={['No']} color="light-danger"
                                                                                     align="left"/>}</div>
                                    </OverlayTrigger>
                                </div>

                                {
                                    publication?.info?.description &&
                                    <div className="d-flex flex-wrap text-gray-600 fs-6 mb-4 pe-2">
                                        <span
                                            className="fw-bold">Description: &nbsp;</span>{publication?.info?.description}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-wrap flex-stack">
                            <div className="d-flex flex-column flex-grow-1 pe-8">
                                <div className="d-flex flex-wrap">
                                    {
                                        (publication?.revenue_type === REVENUE_TYPE.REVENUE_SHARE || (publication?.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER && publication?.publisher?.revenue_type === REVENUE_TYPE.REVENUE_SHARE)) &&
                                        <div
                                            className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <KTSVG
                                                    path="/media/icons/duotune/finance/fin008.svg"
                                                    className="svg-icon-1 svg-icon-success me-2"
                                                />
                                                <div
                                                    className="fs-5 fw-bold">{publication?.revenue_value ? publication?.revenue_value : publication?.publisher?.revenue_value}%
                                                </div>
                                            </div>
                                            <div className="fw-bold fs-6 text-gray-400">Revenue
                                                share {publication?.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER &&
                                                    <small
                                                        className="fw-normal">(same as publisher)</small>}</div>
                                        </div>
                                    }

                                    {
                                        (publication?.revenue_type === REVENUE_TYPE.COMMITMENT || (publication?.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER && publication?.publisher?.revenue_type === REVENUE_TYPE.COMMITMENT)) &&
                                        <div
                                            className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <KTSVG
                                                    path="/media/icons/duotune/finance/fin006.svg"
                                                    className="svg-icon-1 svg-icon-success me-2"
                                                />
                                                <div
                                                    className="fs-5 fw-bold">{publication?.revenue_value ? publication?.revenue_value : publication?.publisher?.revenue_value}</div>
                                            </div>
                                            <div
                                                className="fw-bold fs-6 text-gray-400">Commitment {publication?.revenue_type === REVENUE_TYPE.SAME_AS_PUBLISHER &&
                                                <small
                                                    className="fw-normal">(same as publisher)</small>}</div>
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