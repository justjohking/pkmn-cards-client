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

  isLoggedIn() {
    return service
      .get("/api/users/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getItems(pageNo) {
  //   
  // },
};

export default apiHandler;



// const apiUrl="https://api.pokemontcg.io/v2/cards?api_key=528e1aa6-a294-4981-ada2-1a04038be6ac";


// const getUsers = async function(pageNo = 1) {

// let actualUrl=apiUrl + `&page=${pageNo}`;
// console.log(actualUrl)
// var apiResults=await fetch(actualUrl)
// .then(resp=>{
//   return resp.json();
// });

// return apiResults;

// }

// const getEntireUserList = async function(pageNo = 1) {
  
//   const results = await getUsers(pageNo);
  
//   console.log("Retreiving data from API for page : " + pageNo);
//   if (results.data.length>0) {
//     console.log("here 1")
//     return results.concat(await getEntireUserList(pageNo+1));
//   } else {
//     console.log('here 2')
//     return results;
//   }
// };


// (async ()=>{
//     const entireList=await getEntireUserList();
//     console.log(entireList);

// })();