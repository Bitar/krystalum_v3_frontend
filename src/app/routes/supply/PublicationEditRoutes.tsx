import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
// import axios from 'axios';

// import {SuspenseView} from '../../components/misc/SuspenseView';
// import {Sections} from '../../helpers/sections';

const PublicationEditRoutes: React.FC = () => {
    // const [publication, setPublication] = useState<Publication | null>(null);

    let {id} = useParams();

    // const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // get the publication we need to edit from the database
            // getPublication(parseInt(id)).then(response => {
            //     if (axios.isAxiosError(response)) {
            //         // we were not able to fetch the publication to edit, so we need to redirect
            //         // to error page
            //         navigate('/error/404');
            //     } else if (response === undefined) {
            //         // unknown error occurred
            //         navigate('/error/400');
            //     } else {
            //         setPublication(response);
            //     }
            // });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // const publicationEditBreadcrumbs: Array<PageLink> = [
    //     // {
    //     //     title: Sections.SUPPLY_PUBLICATIONS,
    //     //     path: '/supply/publications/',
    //     //     isSeparator: false,
    //     //     isActive: false,
    //     // },
    //     // {
    //     //     title: '',
    //     //     path: '',
    //     //     isSeparator: true,
    //     //     isActive: false,
    //     // },
    //     // {
    //     //     title: publication?.name || '',
    //     //     path: `/supply/publications/${publication?.id}/edit`,
    //     //     isSeparator: false,
    //     //     isActive: false,
    //     // },
    //     // {
    //     //     title: '',
    //     //     path: '',
    //     //     isSeparator: true,
    //     //     isActive: false,
    //     // }
    // ];

    return (
        <></>
        // <PublicationContext.Provider value={{
        //     publication: publication,
        //     setPublication: setPublication
        // }}>
        //     <Routes>
        //         <Route
        //             path='/edit'
        //             element={
        //                 <SuspenseView>
        //                     <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
        //                     <PublicationEdit/>
        //                 </SuspenseView>
        //             }
        //         />
        //         <Route
        //             path='/contacts/:cid/edit'
        //             element={
        //                 <SuspenseView>
        //                     <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
        //                     <PublicationContactEdit/>
        //                 </SuspenseView>
        //             }
        //         />
        //         <Route
        //             path='/payments/:cid/edit'
        //             element={
        //                 <SuspenseView>
        //                     <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
        //                     <PublicationPaymentEdit/>
        //                 </SuspenseView>
        //             }
        //         />
        //     </Routes>
        // </PublicationContext.Provider>
    )
}

export default PublicationEditRoutes;