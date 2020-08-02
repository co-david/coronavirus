class CoronaApi {
    getCountries() {
        return new Promise((resolve, reject) => {
            fetch("https://api.covid19api.com/countries", {
                method: 'GET',
                redirect: 'follow'
              })
                .then(response  => response.json())
                .then(
                    (result ) => {
                        result.sort((a, b) => (a.Country > b.Country) ? 1 : -1) //Sort the obj by country name
                        return resolve({
                            status: true,
                            countries: result
                        });
                    },
                    (error) => {
                        return reject({
                            status: false,
                            error: error
                        });
                    }
                )
        });
    }

    getTotalCasesByCountry(countrySlug) {
        return new Promise((resolve, reject) => {
            let toDate = new Date(),
                fromDate = new Date();
            toDate.setHours(0,0,0,0);
            fromDate.setDate(toDate.getDate() - 30); //Last 30 days
            fromDate.setHours(0,0,0,0);
            fetch("https://api.covid19api.com/total/country/" + countrySlug + "/status/confirmed?from=" + fromDate.toISOString() + "&to=" + toDate.toISOString(), {
                method: 'GET',
                redirect: 'follow'
              })
                .then(response  => response.json())
                .then(
                    (result ) => {
                        return resolve({
                            status: true,
                            cases: result
                        });
                    },
                    (error) => {
                        return reject({
                            status: false,
                            error: error
                        });
                    }
                )
        });
    }
}

export default new CoronaApi();