import {Country} from '../models/misc/Country';

export const removeAllCountriesOption = (countries: Country[]): Country[] => {
    let allCountriesIndex = -1;

    countries.forEach((country, index) => {
        if(country.name === "All Countries") {
            allCountriesIndex = index;
        }
    });

    if(allCountriesIndex > -1) {
        countries.splice(allCountriesIndex, 1);
    }

    return countries;
}