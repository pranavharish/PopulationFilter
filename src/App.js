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
            population_limit: 0,
            country_list: [],
            filtered_list: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('https://restcountries.eu/rest/v2/all?fields=name;population')
            .then(response => response.json())
            .then(data => {
                data = Utility.quicksort(data)
                this.setState({country_list: data})
                this.setState({filtered_list: data})
            })

    }

    handleChange(event) {
        this.setState({population_limit: event.target.value});
    }

    handleSubmit(event) {
        this.setState({
            filtered_list: Utility
                .filter_results(this.state.country_list, this.state.population_limit)
        })
        event.preventDefault();
    }

    renderFilteredList(filtered_list) {
        return (
            <tr class key={filtered_list.name}>
                <td>{filtered_list.name}</td>
                <td>{filtered_list.population}</td>
            </tr>
        )
    }


    render() {
        const {filtered_list} = this.state
        return (
            <Container fluid>
                <div id="heading">
                    <h1 className="text-center">
                        <Badge pill variant="primary">World Population Lister </Badge><br/><br/><br/>
                    </h1>
                </div>
                <div id="userform">
                    <form className="form-inline justify-content-center text-center" onSubmit={this.handleSubmit}>
                        <label><h4>Population more than: </h4></label>
                        <input type="Number" id="population_limit" value={this.state.population_limit}
                               onChange={this.handleChange}
                               className="form-control"/>
                        <input type="submit" id= "submit_button" value="Submit" className="btn btn-primary"/>
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
                        {filtered_list.map(this.renderFilteredList)}
                        </tbody>
                    </Table>

                </div>
            </Container>
        );
    }
}

export default App;

