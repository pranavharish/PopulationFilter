import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge';
import Utility from "./utility"
import Table from 'react-bootstrap/Table'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //handles the input of the user and filters accordingly
            populationLimit: 0,
            //list of all the countries
            countryList: [],
            //list of filtered countries
            filteredList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *This function is executed after all page elements are loaded without any problem
     * It retrieves all the countries and their populations for restcountries.eu and stores it in countryList
     */
    componentDidMount() {
        // Simple GET request using fetch to get the list of countries along with their population
        fetch('https://restcountries.eu/rest/v2/all?fields=name;population')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data = Utility.quickSort(data)
                console.log(data)
                this.setState({countryList: data})
                this.setState({filteredList: data})
            }).catch(function (error) {
            // handle error
            console.log(error)
            alert("There has been an error while trying to reach restcountries.eu");
        })

    }

    /**
     * This function handles what is to be done when the user types a value in the input box
     * @param event
     */
    handleChange(event) {
        this.setState({populationLimit: event.target.value});
    }

    /**
     * This function handles what is to be done when the user hits the submit button
     * @param event
     */
    handleSubmit(event) {
        this.setState({
            // Call the Utility.filterResults function in utility.js that filters the country list based on a
            // population limit
            filteredList: Utility
                .filterResults(this.state.countryList, this.state.populationLimit)
        })
        event.preventDefault();
    }

    /**
     * This is a helper function that renders the result in a tabular format
     * @param filteredList The list of filteres countries as an Array
     * @returns {JSX.Element}
     */
    renderFilteredList(filteredList) {
        return (
            <tr key={filteredList.name}>
                <td>{filteredList.name}</td>
                <td>{filteredList.population}</td>
            </tr>
        )
    }


    render() {
        const {filteredList} = this.state
        return (
            <Container fluid>
                <div id="heading">
                    <h1 className="text-center">
                        <Badge pill variant="primary">World Population Finder </Badge><br/><br/><br/>
                    </h1>
                </div>
                <div id="userform">
                    <form className="form-inline justify-content-center text-center" onSubmit={this.handleSubmit}>
                        <label><h4>Population more than: </h4></label>
                        <input type="Number" id="populationLimit" value={this.state.populationLimit}
                               onChange={this.handleChange}
                               className="form-control"/>
                        <input type="submit" id= "submitButton" value="Submit" className="btn btn-primary"/>
                    </form>
                </div>
                <br/>
                <br/>
                <div id="results" className="table-responsive">
                    <Table className='table table-bordered table-striped text-center"'>
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th>Population</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredList.map(this.renderFilteredList)}
                        </tbody>
                    </Table>

                </div>
            </Container>
        );
    }
}

export default App;

