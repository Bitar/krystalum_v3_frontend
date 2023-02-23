import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import VideoPlayerIndex from '../../sections/misc/video_players/pages/Index';
import VideoPlayerCreate from '../../sections/misc/video_players/pages/Create';
import VideoPlayerEdit from '../../sections/misc/video_players/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_VIDEO_PLAYERS,
        path: '/misc/video-players/',
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

const VideoPlayerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_VIDEO_PLAYERS}</PageTitle>
                    <VideoPlayerIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <VideoPlayerCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <VideoPlayerEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default VideoPlayerRoutes;
