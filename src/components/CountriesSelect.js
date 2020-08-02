import React, { useState, useEffect } from 'react'
import CoronaApi from '../api/CoronaApi'

// Mterial UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
    }
}));

export default function CountriesSelect(props) {
    const [countries, setCountries] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        CoronaApi.getCountries().then((result) => {
            if (result.status) {
                setCountries(result.countries);
            }
        });
    }, []);

    function handelCountryChanged(countrySlug, countryName) {
        props.updateCountryChanged(countrySlug, countryName);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="country-select-label">Please select country</InputLabel>
                <Select
                    labelId="country-select-label"
                    id="country"
                    defaultValue=""
                    displayEmpty={true}
                    onChange={event => handelCountryChanged(event.target.value, event.nativeEvent.target.innerText)}>
                    {countries &&
                        countries.map(country => (
                            <MenuItem key={country.Slug} value={country.Slug}>
                                {country.Country}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    )
}