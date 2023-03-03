/* eslint-disable jsx-a11y/anchor-is-valid */
import {Route, Routes, Outlet} from 'react-router-dom'
import TemplateErrorPage from './TemplateErrorPage';

const ErrorsLayout = () => {
    return <Outlet/>
}

const ErrorsPage = () => (
    <Routes>
        <Route element={<ErrorsLayout/>}>
            <Route path='403' element={<TemplateErrorPage title={"Access Denied"} code={403} message={"It appears that you are attempting to access content that you are not authorized to view. If you believe you should have access to this resource, please contact the RDI team at MMPWW for assistance."}/>}/>
            <Route path='404' element={<TemplateErrorPage code={404} title={"Resource Not Found"} message={"We're sorry, the resource you requested could not be found. Please check the URL and try again."}/>}/>
            <Route path='400' element={<TemplateErrorPage code={400} title={"Invalid Request"} message={"We're sorry, but the request you submitted was invalid. Please check the input and try again."}/>}/>
            <Route path='500' element={<TemplateErrorPage code={500} title={"Server Error"} message={"We're sorry, but an internal server error occurred while trying to fulfill your request. Please contact the RDI team at MMPWW for assistance."}/>}/>
            <Route index element={<TemplateErrorPage code={404} title={"Resource Not Found"} message={"We're sorry, the resource you requested could not be found. Please check the URL and try again."}/>}/>
        </Route>
    </Routes>
)

export {ErrorsPage}
