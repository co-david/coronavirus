import React, { useState } from 'react';
import CountriesSelect from './components/CountriesSelect'
import Chart from './components/Chart'

// Mterial UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    margin: theme.spacing(1)
  },
  appHeader: {
    backgroundColor: "#fff",
    color: "black",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
  },
  title: {
    marginTop: 20
  }
}));

function App() {
  const [selectedCountry, setSelectedCountery] = useState("");
  const [selectedCountryName, setSelectedCounteryName] = useState("");
  const classes = useStyles();

  function handelCountryChanged(countrySlug, countryName) {
    setSelectedCountery(countrySlug);
    setSelectedCounteryName(countryName);
  }

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <CountriesSelect  updateCountryChanged={handelCountryChanged}/>
        {selectedCountryName &&
          <div className={classes.title}>Total Coronavirus Cases in {selectedCountryName}</div>
        }
        <Chart country={selectedCountry} />
      </header>
    </div>
  );
}

export default App;
