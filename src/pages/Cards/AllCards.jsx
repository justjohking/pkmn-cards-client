import React, { Component } from 'react';
import './AllCards.css'
import apiHandler from '../../api/apiHandler';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

export class AllCards extends Component {

    state = {
        cards: [],
        loading: false,
        loadingItems : false,
        page: 1,
        prevY: 0,
        name: "",
        auction: false,
        exchange: false
    }

    // pokemon API method to get all the pokemons
    getAllPokemons(page){
        this.setState({
            loading: true, 
            page: 1, 
            prevY: 0, 
            cards: [],
            name: ""
        })

        apiHandler.getApiByPage(page)
        .then((res) => {
            this.setState({cards: [...this.state.cards, ...res.data]});
            this.setState({loading: false});
        })
        .catch(err => { console.log(err) })

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );

        this.observer.observe(this.loadingRef)
    }

    // pokemon API method to get all the pokemons that start with the input
    getPokemonsByName = (name, page) => {
        this.setState({
            loading: true, 
            page: 1, 
            prevY: 0, 
            cards: [],
        })
        apiHandler.filterApiByName(name, page)
        .then((res) => {
            this.setState({cards: [...this.state.cards, ...res.data]});
            this.setState({ loading: false})
        })
        .catch(error => console.log(error))
    }


    handleObserver(entities, observer){
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y){
           
            const curPage = this.state.page + 1;

            if(this.state.name !== "") {
                this.getPokemonsByName(this.state.name, curPage);
            } else {
                this.getAllPokemons(curPage);
            }

            this.setState({page: curPage});
        }
        this.setState({prevY: y})
    }

    // handle the change of input
    // function is a prop to <SearchBar />
    handleChange = (input) => {
        this.setState({ name: input });
    }

    // click on "search" button to filter the input name
    // function is a prop to <SearchBar />
    handleClick = () => {
        this.getPokemonsByName(this.state.name, this.state.page);
    }

    // click on "reset search" to get all the Pokemons back
    // function is a prop to <SearchBar />
    handleReset = () => {
        this.getAllPokemons(this.state.page);
    }

    // add a card to my collection
    addCard = async (apiId) => {
        try {
            await apiHandler.addCard({pokemonTCGId: apiId});
        } catch (error) {console.error(error)}
    }

    componentDidMount(){
        this.getAllPokemons(this.state.page);
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
          };

        const loadingTextCSS = { display: this.state.loadingItems ? "block" : "none" };

        return (
            <div className="all-cards-container">

                <h2>All existing cards</h2>
                
                <div className="search-div">
                    <SearchBar 
                    name={this.state.name}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    handleReset={this.handleReset}
                    />
                </div>
                
                {this.state.loading && 
                <Loading />}
                
                <div className="list-cards-container">
                    <div className="list-cards">
                        {this.state.cards.map(card => (
                            <div className="card-container" key={card.id}>
                                <Link to={"/cards/" + card.id}>
                                    <img src={card.images.small} alt="pokemon trading game card" />
                                </Link>
                                {/* <p className='title'>{card.name}</p> */}
                                {/* <Link to={"/cards/" + card.id} className="button primary">Card details</Link> */}
                            </div>
                        ))}
                    </div>
                    
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                        {this.state.cards.length > 0 && 
                        <Loading style={loadingTextCSS}/>}

                    {/* <span style={loadingTextCSS}>Loading...</span> */}
                    </div>

                </div>
                
            </div>
        )
    }
}

export default AllCards

