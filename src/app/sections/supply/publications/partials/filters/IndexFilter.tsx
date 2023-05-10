import React, {useState} from 'react';
import PublicationFilter from './Filter';
import {fillFilterFields, FilterFields} from '../../core/filterForm';

interface Props {
    showFilter: boolean,
    setExportQuery: React.Dispatch<React.SetStateAction<string>>
}

const PublicationIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const [filters, setFilters] = useState<FilterFields>(fillFilterFields('is_archived', 0));

    return (
        <PublicationFilter showFilter={showFilter} setExportQuery={setExportQuery} filters={filters} setFilters={setFilters}/>
    );
}

export default PublicationIndexFilter;