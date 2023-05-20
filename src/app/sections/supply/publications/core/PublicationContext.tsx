import axios from 'axios';
import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../../../../_metronic/helpers';
import {filterData} from '../../../../helpers/dataManipulation';
import {AdServer} from '../../../../models/misc/AdServer';
import {Country} from '../../../../models/misc/Country';
import {Currency} from '../../../../models/misc/Currency';
import {Format} from '../../../../models/misc/Format';
import {Language} from '../../../../models/misc/Language';
import {Region} from '../../../../models/misc/Region';
import {Technology} from '../../../../models/misc/Technology';
import {Vertical} from '../../../../models/misc/Vertical';
import {Publication} from '../../../../models/supply/publication/Publication';
import {Publisher} from '../../../../models/supply/publisher/Publisher';
import {getAllAdServers} from '../../../../requests/misc/AdServer';
import {getAllCountries, getAllCurrencies} from '../../../../requests/misc/Country';
import {getAllFormats} from '../../../../requests/misc/Format';
import {getAllLanguages} from '../../../../requests/misc/Language';
import {getAllRegions} from '../../../../requests/misc/Region';
import {getAllTechnologies} from '../../../../requests/misc/Technology';
import {getAllVerticals} from '../../../../requests/misc/Vertical';
import {getAllPublishers} from '../../../../requests/supply/publisher/Publisher';

interface Props {
    publication: Publication | null;
    setPublication: Dispatch<SetStateAction<Publication | null>>;
    refresh: boolean | null;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    handleRefresh: () => void,
    publishers: Publisher[],
    setPublishers: Dispatch<SetStateAction<Publisher[]>>;
    languages: Language[],
    setLanguages: Dispatch<SetStateAction<Language[]>>;
    formats: Format[],
    setFormats: Dispatch<SetStateAction<Format[]>>;
    adServers: AdServer[],
    setAdServers: Dispatch<SetStateAction<AdServer[]>>;
    technologies: Technology[],
    setTechnologies: Dispatch<SetStateAction<Technology[]>>;
    verticals: Vertical[],
    setVerticals: Dispatch<SetStateAction<Vertical[]>>;
    regions: Region[],
    setRegions: Dispatch<SetStateAction<Region[]>>;
    countries: Country[],
    setCountries: Dispatch<SetStateAction<Country[]>>;
    currencies: Currency[],
    setCurrencies: Dispatch<SetStateAction<Currency[]>>;
}

const defaultPublicationContext = {
    publication: null,
    setPublication: () => {
    },
    refresh: false,
    setRefresh: () => {
    },
    handleRefresh: () => {
    },
    publishers: [],
    setPublishers: () => {
    },
    languages: [],
    setLanguages: () => {
    },
    formats: [],
    setFormats: () => {
    },
    adServers: [],
    setAdServers: () => {
    },
    technologies: [],
    setTechnologies: () => {
    },
    verticals: [],
    setVerticals: () => {
    },
    regions: [],
    setRegions: () => {
    },
    countries: [],
    setCountries: () => {
    },
    currencies: [],
    setCurrencies: () => {
    }
}

export const PublicationContext = createContext<Props>(defaultPublicationContext)

export const usePublication = () => {
    return useContext(PublicationContext)
}

export const PublicationProvider: FC<WithChildren> = ({children}) => {
    const [publication, setPublication] = useState<Publication | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [formats, setFormats] = useState<Format[]>([]);
    const [adServers, setAdServers] = useState<AdServer[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [verticals, setVerticals] = useState<Vertical[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        // get the list of all publishers
        getAllPublishers().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of publishers, then we fill our state with them
                if (response.data) {
                    setPublishers(response.data);
                }
            }
        });

        // get the list of all languages
        getAllLanguages().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of languages, then we fill our state with them
                if (response.data) {
                    setLanguages(response.data);
                }
            }
        });

        // get the list of all formats
        getAllFormats().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of formats, then we fill our state with them
                if (response.data) {
                    setFormats(filterData(response.data, 'name', ['All Formats']));
                }
            }
        });

        // get the list of all ad servers
        getAllAdServers().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of ad servers, then we fill our state with them
                if (response.data) {
                    setAdServers(response.data);
                }
            }
        });

        // get the list of all technologies
        getAllTechnologies().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of technologies, then we fill our state with them
                if (response.data) {
                    setTechnologies(response.data);
                }
            }
        });

        // get the list of all verticals
        getAllVerticals().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of verticals, then we fill our state with them
                if (response.data) {
                    setVerticals(response.data);
                }
            }
        });

        // get the list of all countries
        getAllCountries().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of countries, then we fill our state with them
                if (response.data) {
                    setCountries(filterData(response.data, 'name', ['All Countries']));
                }
            }
        });

        // get the list of all regions
        getAllRegions().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of regions, then we fill our state with them
                if (response.data) {
                    setRegions(filterData(response.data, 'name', ['All Regions', 'Rest of the world']));
                }
            }
        });

        // get the list of all ad servers
        getAllAdServers().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of adServers, then we fill our state with them
                if (response.data) {
                    setAdServers(response.data);
                }
            }
        });

        // get the list of all currencies
        getAllCurrencies().then(response => {
            if (axios.isAxiosError(response)) {
                //
            } else if (response === undefined) {
                //
            } else {
                // if we were able to get the list of currencies, then we fill our state with them
                if (response.data) {
                    setCurrencies(response.data);
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PublicationContext.Provider value={{
            publication, setPublication,
            refresh, setRefresh,
            publishers, setPublishers,
            languages, setLanguages,
            formats, setFormats,
            adServers, setAdServers,
            technologies, setTechnologies,
            verticals, setVerticals,
            regions, setRegions,
            countries, setCountries,
            currencies, setCurrencies,
            handleRefresh
        }}>
            {children}
        </PublicationContext.Provider>
    )
}