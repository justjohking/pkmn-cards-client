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


  /* === POKEMON API === */
  getItems() {
    return service
    .get("/api/pokemonApi/all")
    .then((res) => res.data)
    .catch(errorHandler)
  },

  getApiByPage(page) {
    return service 
    .get(`/api/pokemonApi/all/${page}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getOneCardFromApi(id) {
    return service
    .get(`/api/pokemonApi/${id}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  filterApiByName(name, page) {
    return service
    .get(`/api/pokemonApi/search/${name}/${page}`)
    .then(res => res.data)
    .catch(errorHandler)
  },



  /* === USER CARDS === */
  getAllUserCards() {
    return service 
    .get("/api/user/cards")
    .then(res => res.data)
    .catch(errorHandler)
  },

  getOneUserCard(id) {
    return service 
      .get("/api/user/cards/" + id)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getAllUserCardsFromApiCard(tcgID) {
    return service
    .get("/api/user/cards/tcg/" + tcgID)
    .then(res => res.data)
    .catch(errorHandler)
  },

  addCard(card) {
    return service
    .post("/api/user/cards/add", card)
    .then(res => res.data)
    .catch(errorHandler)
  },

  updateCard(id, updatedCard) {
    return service
    .patch(`/api/user/cards/${id}/update`, updatedCard)
    .then(res => res.data)
    .catch(errorHandler)
  },

  
  /* === AUCTIONS === */

  findOpenAuctions(){
    return service
    .get(`/api/auctions`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  findAuction(id){
    return service
    .get(`/api/auctions/${id}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  // When placing a bid
  updateAuction(id, newBid){
    return service
    .patch(`/api/auctions/${id}`, newBid)
    .then(res => res.data)
    .catch(errorHandler)
  },

  createAuction(auction){
    return service
    .post('/api/user/auctions/create', auction)
    .then(res => res.data)
    .catch(errorHandler)
  },

  deleteAuction(auctionId){
    return service
      .delete(`/api/user/auctions/${auctionId}/delete`)
      .then(res => res.data)
      .catch(errorHandler)
  },

  deleteAuctionByItem(id){
    return service
    .delete(`/api/user/auctions/${id}/deleteByItem`)
  },

  findUserAuctions(){
    return service
      .get("/api/user/auctions")
      .then(res => res.data)
      .catch(errorHandler)
  },

  //Get all the auctions on one TCGCard
  getAuctionsForTCGCard(tcgId){
    return service
    .get("/api/auctions/" + tcgId)
    .then(res => res.data)
    .catch(errorHandler)
  },



  /* === EXCHANGES === */

  getAllOpenEchanges() {
    return service 
    .get("/api/exchanges")
    .then(res => res.data)
    .catch(errorHandler)
  },

  getAllOpenEchangesForTCGCard(tcgId) {
    return service 
    .get("/api/exchanges/" + tcgId)
    .then(res => res.data)
    .catch(errorHandler)
  },

  // get exchange offers RECEIVED
  getExchangeOffersReceived() {
    return service 
    .get("/api/user/exchanges/offers")
    .then(res => res.data)
    .catch(errorHandler)
  },
  
  // Create EXCHANGE OFFERS
  createExchange(exchange) {
    return service 
    .post("/api/user/exchanges/create", exchange)
    .then(res => res.data)
    .catch(errorHandler)
  },

  // delete Exchange
  deleteExchange(id) {
    return service
    .delete(`/api/user/exchanges/${id}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  // Find the exchange offer initiated by the user
  // over one particular item
  getExchangeBySellerItem (idItem) {
    return service
    .get(`/api/user/exchanges/${idItem}`)
    .then(res => res.data)
    .catch(errorHandler)
  }

}

export default apiHandler;
