import React, {useState} from 'react';
import {fillFilterFields, FilterFields} from '../../core/filterForm';
import PublicationFilter from './Filter';

interface Props {
    showFilter: boolean;
    setExportQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PublicationArchivedFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const [filters, setFilters] = useState<FilterFields>(fillFilterFields('is_archived', 1));

    return (
        <PublicationFilter showFilter={showFilter} setExportQuery={setExportQuery} filters={filters}
                           setFilters={setFilters}/>
    );
}

export default PublicationArchivedFilter;