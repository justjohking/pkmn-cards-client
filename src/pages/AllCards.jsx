import React, { Component } from 'react';
import '../pages/AllCards.css'
import OneCardItemList from '../components/CardsList/OneCardItemList'
import apiHandler from '../api/apiHandler';
import SearchBar from '../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export class AllCards extends Component {
    state = {
        cards: [],
        loading: false,
        page: 1,
        prevY: 0,
        name: ""
    }

    getAllPokemons(page){
        this.setState({
            loading: true
        });

        apiHandler.getApiByPage(page)
        .then((res) => {
            this.setState({cards: [...this.state.cards, ...res.data]});
            this.setState({loading: false});
        })
        .catch(err => {
            console.log(err)
        })

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

    getPokemonsByName = (name, page) => {
        this.setState({ loading: true });
        apiHandler.filterApiByName(name, page)
        .then((res) => {
            this.setState({
                cards: [...this.state.cards, ...res.data],
                loading: false
            });
        })
        .catch(error => console.log(error))

    }


    handleObserver(entities, observer){
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y){
           
            const curPage = this.state.page + 1;
            this.getAllPokemons(curPage);
            this.setState({page: curPage})
        }
        this.setState({prevY: y})
    }

    handleNameInputChange = (input) => {
        this.setState({
            name: input
        })
    }

    addCard = async (apiId) => {
        try {
            await apiHandler.addCard({pokemonTCGId: apiId});
        } catch (error) {console.error(error)}
    }

    componentDidMount(){
        this.getAllPokemons(this.state.page);

        
    }

    async componentDidUpdate(prevProp, prevState) {
        console.log("updated")
        if(this.state.name !== prevState.name) {
            this.getPokemonsByName(this.state.name, this.state.page);

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

        if(this.state.name !== prevState.name && this.state.name === "") {
            this.getAllPokemons(this.state.page)
        }
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
          };

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        

        return (
            <div className="container">
                <SearchBar 
                name={this.state.name}
                handleNameInputChange={this.handleNameInputChange}
                />

                {this.state.loading && 
                <Loading />}
                
                <div style={{ minHeight: "800px", display: "flex", "flexWrap": "wrap" }}>
                {this.state.cards.map(card => (
                    <OneCardItemList card={card}>
                        <div>
                            <Link to={"/cards/" + card.id}>Card details</Link>
                            <button onClick={() => {this.addCard(card.id)}}>Add Card</button>
                        </div>
                    </OneCardItemList>

                ))}
                </div>
                <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}
                >
                <span style={loadingTextCSS}>Loading...</span>
                </div>
      </div>
        )
    }
}

export default AllCards

