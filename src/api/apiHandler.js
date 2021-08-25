import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/users/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  
  getOneCard(id) {
    return service 
      .get("/api/me/cards/" + id)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  // getItems() {
  //   return axios
  //     .get("https://api.pokemontcg.io/v2/cards?api_key=528e1aa6-a294-4981-ada2-1a04038be6ac")
  //     .then((res) => res.data.data)
  //     .catch(errorHandler);
  // },

  getItems() {
    return service
    .get("/api/pokemonApi/all")
    .then((res) => res.data)
    .catch(errorHandler)
  },
  //old getItems => getAllCards => will get all the cards from the API
  // getAllCards() {
  //   return axios
  //     .get("https://api.pokemontcg.io/v2/cards?api_key=528e1aa6-a294-4981-ada2-1a04038be6ac")
  //     .then((res) => res.data.data)
  //     .catch(errorHandler);
  // },


  getOneCardFromApi(id) {
    return service
    .get(`/api/pokemonApi/${id}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getApiByPage(page) {
    return service 
    .get(`/api/pokemonApi/all/${page}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  filterApiByName(name) {
    return service
    .get(`/api/pokemonApi/search/${name}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  //old getAllCards => getAllUserCards removed /api 
  getAllUserCards() {
    return service 
    .get("/api/me/cards")
    .then(res => res.data)
    .catch(errorHandler)
  },

  addCard(card) {
    return service
    .post("/api/me/cards/add", card)
    .then(res => res.data)
    .catch(errorHandler)
  },

  updateCard(id, updatedCard) {
    return service
    .patch(`/api/me/cards/${id}/edit`, updatedCard)
    .then(res => res.data)
    .catch(errorHandler)
  },
  //User Interaction
  //old findUserCollection => getUserCollection removed /api
  getUserCollection(type) {
    return service 
    .get(`/api/me/collection/${type}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getOneUserCard(id){
    return service
    .get("/api/me/cards/" + id)
    .then(res => res.data)
    .catch(errorHandler)
  },

  // addCardToCollection(collection, updatedCardList) {
  //   return service
  //   .patch(`/api/me/collection/${collection}`, updatedCardList)
  //   .then(res => res.data)
  //   .catch(errorHandler)
  // },


  // Bids 
  //create a new bid
  createBid(bid){
    return service
    .post('/api/bids/create', bid)
    .then(res => res.data)
    .catch(errorHandler)
  },

  deleteBid(bid){
    return service
      .delete(`/api/bids/${bid}`)
      .then(res => res.data)
      .catch(errorHandler)
  },

  //?? delete this i think
  findCardsOnSale(){
    return service
    .get(`/api/bids`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  findUserAuctions(){
    return service
      .get("/api/profile/auctions")
      .then(res => res.data)
      .catch(errorHandler)
  },
  


  findBid(id){
    return service
    .get(`/api/bids/${id}`)
    .then(res => res.data)
    .catch(errorHandler)
},


  updatedBids(id, newBid){
      return service
      .patch(`/api/bids/${id}`, newBid)
      .then(res => res.data)
      .catch(errorHandler)
  },


  getAllUserCardsFromApiCard(apiId) {
    return service
    .get("/api/me/cards/all/" + apiId)
    .then(res => res.data)
    .catch(errorHandler)
  },

  //Get all the cards that are on sell
  getCardsOnSale(tcgId){
    return service
    .get("/api/cards/bids/" + tcgId)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getAllCardsOpenForExchange() {
    return service 
    .get("/api/exchanges")
    .then(res => res.data)
    .catch(errorHandler)
  },

  getAllCardsOneOfApiIdOpenForExchange(tcgId) {
    return service 
    .get("/api/exchanges/" + tcgId)
    .then(res => res.data)
    .catch(errorHandler)
  },
  
}

export default apiHandler;
