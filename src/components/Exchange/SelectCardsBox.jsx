// import React, { Component } from 'react';
// import apiHandler from '../../api/apiHandler';
// import SelectCardsDialog from './SelectCardsDialog';

// export class SelectCardsBox extends Component {
//     state = {
//         cards: []
//     }

//     handleClickOpen = () => {
//         setOpen(true);
//       };

//     handleClose = (value) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };

//     async componentDidMount() {
//         const cards =  await apiHandler.getAllUserCards();
//         const cardPromises = cards.map(card => {
//             return apiHandler.getOneCardFromApi(card.pokemonTCGId);
//         })
//         const responses = await Promise.all(cardPromises);
//         const populatedCards = cards.map((card,i) => {
//           return {
//               ...card,
//               pokemonTCGId: responses[i]
//           }
//         })
//         this.setState({
//             cards: populatedCards
//         })
//     }
//     render() {
//         return (
//             <div>
//                 <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//                 <br />
//                 <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 Open simple dialog
//                 </Button>
//                 <SelectCardsDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//             </div>
//         )
//     }
// }

// export default SelectCardsBox
