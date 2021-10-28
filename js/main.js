// Using JavaScript(axios) and the DOM you are to create a table of data using the F1 racer API. 
// The table should have a total of 7 rows and dynamically populate the data when a "season" and "round" 
// are specified within your form. Rows should be populated with position, Name (fist + last), Sponsor, Nationality, Points

const getData = async () => {
    let response = await axios.get('https://ergast.com/api/f1/2020/1/driverStandings.json')
    // return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    return response.data.MRData.StandingsTable
}

const DOM_Elements = {
    racer_table: '.racer-table'
}

const create_rows = (num, firstName, lastName, Sponsor, Nationality, Points) => {
    const html = 
        `<tr>
            <td>${num}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${Sponsor}</td>
            <td>${Nationality}</td>
            <td>${Points}</td>
        </tr>`;

    document.querySelector(DOM_Elements.racer_table).insertAdjacentHTML('beforeend', html)
}

const load_data = async (season, round) => {
    const standingsTable = await getData();
    console.log(standingsTable)
    if (standingsTable.season == season && standingsTable.round == round) {
        driverStandings = standingsTable.StandingsLists[0].DriverStandings;
        console.log(driverStandings)
        for (let y = 0; y < driverStandings.length && y < 7; y++) {
            create_rows(y+1, driverStandings[y].Driver.givenName, driverStandings[y].Driver.familyName, driverStandings[y].Constructors[0].name, driverStandings[y].Driver.nationality, driverStandings[y].points)
        }
    }
}

// Grabbing Form Data From a Submit event
const form = document.querySelector('#testDataForm')
// console.log(form)

// Add event listener for submit event
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let season = document.querySelector('#season');
    let round = document.querySelector('#round');
    console.log(season.value, round.value);

    load_data(season.value, round.value);
} )