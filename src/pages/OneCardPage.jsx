import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import OneCardActions from '../components/OneCard/OneCardActions';
import CardInfo from '../components/OneCard/CardInfo';
import "../components/OneCard/OneCard.css";


export class OneCardPage extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
    }

    async componentDidMount() {
        const pokemonInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id)
        this.setState({
            pokemon: pokemonInfo.data
        })

    //     await apiHandler
    //   .isLoggedIn()
    //   .then((data) => {
    //     this.setState({ user: data, isLoggedIn: true});
    //   })
    //   .catch((error) => {
    //     this.setState({ user: null, isLoggedIn: false});
    //   });
    }

    addCardToOwned = async () => {
        try {
            const cardToAdd = {
            pokemonTCGId: this.state.pokemon.id,
        }
        //CREATE A CARD
            const newUserCard = await apiHandler.addCard(cardToAdd);
            console.log(newUserCard._id)

        // FIND THE OWNED COLLECTION AND ADD CARD TO NEW ARRAY
            const foundCollection = await apiHandler.findUserCollection("Owned");
            const updatedCardList = foundCollection[0].cards
            updatedCardList.push(newUserCard._id)
            console.log(updatedCardList)
        
        // UPDATE THE COLLECTION WITH THE NEW ARRAY
            const updatedCollection = await apiHandler.addCardToCollection("Owned", {cards : updatedCardList});
            console.log(updatedCollection)
        } 
        catch (error) {console.error(error)}
    }





    
    render() {
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="div-left">

                        <img src={this.state.pokemon.images.large} alt="card"/>

                            <OneCardActions addCardToOwned={this.addCardToOwned}>{this.state}</OneCardActions>

                    </div>
    
                    <CardInfo
                    pokemon={this.state.pokemon}
                    />
                </div>
            )
        }

    }
}

export default OneCardPage
/* 
For the buttons :
*/