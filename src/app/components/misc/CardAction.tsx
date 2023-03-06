import {Actions} from '../../helpers/variables';
import React from 'react';
import {ExportUrl} from '../../helpers/requests';
import {AxiosError} from 'axios';
import CreateButton from '../buttons/Create';
import EditButton from '../buttons/Edit';
import FilterButton from '../buttons/Filter';
import ExportButton from '../buttons/Export';
import {Restricted} from '../../modules/auth/AuthAccessControl';

export class CardAction {
    type: Actions

    constructor(type: Actions) {
        this.type = type;
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (<></>);
    }
}

export class CreateCardAction extends CardAction {
    url: string;
    permission: string;

    constructor(url: string, permission: string) {
        super(Actions.CREATE);

        this.url = url;
        this.permission = permission;
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <CreateButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        );
    }
}

export class EditCardAction extends CardAction {
    url: string;
    permission: string;

    constructor(url: string, permission: string) {
        super(Actions.EDIT);

        this.url = url;
        this.permission = permission;
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <EditButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}

export class FilterCardAction extends CardAction {
    target: string;
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;

    constructor(target: string, showFilter: boolean, setShowFilter: React.Dispatch<React.SetStateAction<boolean>>) {
        super(Actions.FILTER);

        this.target = target;
        this.showFilter = showFilter;
        this.setShowFilter = setShowFilter;
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (<FilterButton key={index} target={this.target}
                              showFilter={this.showFilter}
                              setShowFilter={this.setShowFilter} className='ms-2'/>);
    }
}

export class ExportCardAction extends CardAction {
    exportQuery: string;
    exportApiCall: (query?: string) => Promise<ExportUrl | AxiosError | undefined>;

    constructor(exportQuery: string, exportApiCall: (query?: string) => Promise<ExportUrl | AxiosError | undefined>) {
        super(Actions.EXPORT);

        this.exportQuery = exportQuery;
        this.exportApiCall = exportApiCall;
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (<ExportButton exportQuery={this.exportQuery}
                              exportApiCall={this.exportApiCall} key={index}
                              className='ms-2'/>)
    }
}