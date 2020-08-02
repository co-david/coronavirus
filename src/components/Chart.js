import React, { useState, useEffect } from 'react'
import CoronaApi from '../api/CoronaApi'

// Mterial UI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

//Canvas JS
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 30
    },
    loder: {
        marginLeft: 10
    },
    notFound: {
        fontSize: 14,
        color: "red",
    },
}));

export default function Chart({ country }) {
    const [isLoading, setLoding] = useState(false);
    const [cases, setCases] = useState([]);
    const classes = useStyles();

    const options = {
        theme: "light2",
        title: {
            text: "Total Cases",
            fontSize: 25,
        },
        axisY: {
            title: "Total Coronavirus Cases",
        },
        data: [{
            type: "line",
            dataPoints: cases
        }]
    }

    useEffect(() => {
        setCases([]);
        if (country !== "") {
            setLoding(true);
            CoronaApi.getTotalCasesByCountry(country).then((result) => {
                setLoding(false);
                if (result.status) {
                    let cases = result.cases.map(function(item) {
                        let date = new Date(item.Date),
                            dateCase = date.toLocaleString('default', { month: 'short' }) + " " + date.getDate();
                        return {
                          "label": dateCase,
                          "y": item.Cases,
                        } 
                    });
                    setCases(cases);
                }
            });
        }
    }, [country]);
    return (
        <div className={classes.container}>
            {isLoading &&
                <div>
                    Loading data...
                    <CircularProgress className={classes.loder} size='1rem' />
                </div>
            }
            {cases.length > 0 &&
                <CanvasJSChart options={options} />
            }
            {country && cases.length === 0 && !isLoading &&
                <div className={classes.notFound}>
                    Not found cases
                </div>
            }
        </div>
    );
}