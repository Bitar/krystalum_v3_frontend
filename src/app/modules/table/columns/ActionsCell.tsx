/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {stringifyRequestQuery} from '../../../../_metronic/helpers'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {Link} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import {useQueryRequest} from '../QueryRequestProvider'
import clsx from 'clsx'
import Swal from 'sweetalert2';
import axios from 'axios';
import {deleteObject, extractErrors} from '../../../helpers/requests';
import {Button} from 'react-bootstrap';
import {useAuth} from '../../auth';

type Props = {
    id: number
    path: string
    queryKey: string
    showEdit?: boolean
    showDelete?: boolean
    showImpersonate?: boolean
    showView?: boolean
    callBackFn?: any
    title?: string,
    text?: string
}

const ActionsCell: FC<React.PropsWithChildren<Props>> = ({
                                                             id,
                                                             path,
                                                             queryKey,
                                                             showEdit,
                                                             showDelete = true,
                                                             showView,
                                                             showImpersonate = false,
                                                             callBackFn,
                                                             title,
                                                             text
                                                         }) => {
    const queryClient = useQueryClient();
    const {state} = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const {auth, saveAuth} = useAuth();

    useEffect(() => {
        MenuComponent.reinitialization()
    }, []);

    useEffect(() => {
        setQuery(stringifyRequestQuery(state));
    }, [state]);

    const deleteItem = async () => {
        const {isConfirmed} = await Swal.fire({
            title: title ? title : 'Delete',
            text: text ? text : 'Are you sure you want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm Delete',
            confirmButtonColor: "#DB4437",
            cancelButtonText: 'Dismiss',
            reverseButtons: true
        })

        if (isConfirmed) {
            deleteObject(path + '/' + id)
                .then(() => {
                    queryClient.invalidateQueries(`${queryKey}-${query}`)
                }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    const errorMessages = extractErrors(error).map((errorMessage) => `<li>${errorMessage}</li>`)

                    // we need to show the error
                    Swal.fire(
                        'Something Wrong Happened',
                        "<p>" + errorMessages.join() + "</p>",
                        "error"
                    );
                } else if (error === undefined) {
                    // we need to show a generic error
                    Swal.fire(
                        'Something Wrong Happened',
                        "<p>Could not complete your request. Please try again later.</p>",
                        "error"
                    );
                }
            }).finally(() => {
                if (callBackFn) {
                    callBackFn()
                }
            });
        }
    }

    const impersonateUser = function() {
        // we just need to update the auth user to have the impersonated user id
        // remove existing impersonatedUserId
        if(auth) {
            const {impersonatedUserId, ...newAuth} = auth;

            saveAuth({...newAuth, impersonatedUserId: id});

            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    }

    return (
        <>
            {showView && (
                <Link to={'/' + path + '/' + id} className='btn btn-icon btn-active-light-info'>
                    <i className={clsx('fa-duotone fs-3 text-info', 'fa-circle-info')}></i>
                </Link>
            )}

            {
                showImpersonate && (
                    <Button className='btn-sm btn-icon' variant='active-light-primary' onClick={impersonateUser}>
                        <i className={clsx('fa-duotone fs-3 text-primary', 'fa-user-secret')}></i>
                    </Button>
                )
            }

            {showEdit && (
                <Link
                    to={'/' + path + '/' + id + '/edit'}
                    className='btn btn-icon btn-sm btn-active-light-warning'
                >
                    <i className={clsx('fa-duotone fs-3 text-warning', 'fa-pencil')}></i>
                </Link>
            )}

            {showDelete && (
                <a
                    className='btn btn-icon btn-sm btn-active-light-danger'
                    onClick={async () => deleteItem()}
                >
                    <i className={clsx('fa-duotone fs-3 text-danger', 'fa-trash')}></i>
                </a>
            )}
        </>
    )
}

export {ActionsCell}
