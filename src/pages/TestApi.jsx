import React, { Component } from 'react';
import OneCardItemList from '../components/CardsList/OneCardItemList';
import SearchBar from '../components/SearchBar/SearchBar';
import pokemon from 'pokemontcgsdk'
pokemon.configure({apiKey: process.env.API_KEY});


export class TestApi extends Component {
    state = {
        cards: [],
        loading: false,
        page: 1,
        prevY: 0,
        name: ""
    }

    getPokemons(pageNumber){
        this.setState({
            loading: true
        });

        pokemon.card.where({ pageSize: 40, page: pageNumber})
        .then((res) => {
            console.log(res)
            this.setState({cards: [...this.state.cards, ...res.data]});
            // console.log(this.state.cards)
            this.setState({loading: false});
        })
        .catch(err => {
            console.log(err)
        })

        // axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=40`).then((res) => { 
        //     this.setState({cards: [...this.state.cards, ...res.data.data]});
        //     console.log(this.state.cards)
        //     this.setState({loading: false});
        // }).catch(err => { console.log(err) })
    }

    componentDidMount(){
        this.getPokemons(this.state.page);

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

    handleObserver(entities, observer){
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y){
           
            const curPage = this.state.page + 1;
            this.getPokemons(curPage);
            this.setState({page: curPage})
        }
        this.setState({prevY: y})
    }

    handleNameInputChange = async (input) => {
        // const key = event.target.name;
        // const value = event.target.value;
        this.setState({
            name: input
        })
        // const filteredCards = await apiHandler.filterApiByName(this.state.name)
        // .then(cards => this.setState({
        //     cards: filteredCards
        // }))
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
          };

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        
        return (
            <div className="container">
                <React.Fragment>
                    <SearchBar 
                    name={this.state.name}
                    handleNameInputChange={this.handleNameInputChange}
                    />
                </React.Fragment>
                

                <div style={{ minHeight: "800px", display: "flex", "flexWrap": "wrap" }}>
                {this.state.cards.map(card => (
                    <OneCardItemList card={card} link={"/cards/" + card.id}/>  
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

export default TestApi
