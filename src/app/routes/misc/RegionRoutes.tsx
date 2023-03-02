import React from "react";
import {Route, Routes} from "react-router-dom";
import {SuspenseView} from "../../components/misc/SuspenseView";
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Sections} from "../../helpers/sections";
import RegionIndex from '../../sections/misc/regions/pages/Index';
import RegionCreate from '../../sections/misc/regions/pages/Create';
import RegionEdit from '../../sections/misc/regions/pages/Edit';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_REGIONS,
        path: '/misc/regions/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const RegionRoutes: React.FC = () => {

    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_REGIONS}</PageTitle>
                    <RegionIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <RegionCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <RegionEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default RegionRoutes;