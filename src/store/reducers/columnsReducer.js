import {CONSTS} from "../actions/actionTypes";

let cardId = 1;

const initialState = [
  {
    id:0,
    title: 'Test column',
    cards: [
      {
        id: 0,
        text: 'test Card 1',
        description: '',
        dateCard: new Date(),
        type: 'newCard'
      }
    ]
  }
];

export default function columnReducer(state = initialState, action) {
  switch (action.type){

    case CONSTS.ADD_COLUMN: {
      let newState = [...state];
      let colsId = newState.map( item => item.id );
      if ( !colsId.length ) colsId.push(0);
      newState.push({
        id: Math.max(...colsId) + 1,
        title: action.payload,
        cards: []
      });
      return newState;
    }

    case CONSTS.ADD_CARD: {
      const newCard = {
        id: cardId,
        text: action.payload.text,
        description: '',
        dateCard: new Date(),
        type: 'newCard'
      };
      cardId += 1;

      let newState = state.map((column) => {
        if (column.id === action.payload.columnId) {
          return {
            ...column,
            cards: [...column.cards, newCard]
          }
        } else {
          return column
        }
      });
      return newState;
    }
    case CONSTS.ADD_DESCRIPTION: {
      const { columnId, id, newDescription } = action.payload;
      const newState = [...state];
      const cards = state[columnId].cards;
      cards.forEach((card, index) =>{
        if ( card.id === id ) {
          card.description = newDescription;
        }
      });

      return newState;
    }
    case CONSTS.CHANGE_COLOR: {
      const { columnId, id, newBgColor } = action.payload;
      const newState = [...state];
      const cards = state[columnId].cards;
      cards.forEach((card, index) =>{
        if ( card.id === id ) {
          card.type = newBgColor;
        }
      });

      return newState;
    }
    case CONSTS.DELETE_CARD: {
      const {columnId, id } = action.payload;
      let newState = [...state];
      const cards = state[columnId].cards;
      cards.forEach((card, index) =>{
        if ( card.id === id ) {
          cards.splice(index, 1);
        }
      });
      return newState;
    }

    // case CONSTS.DRAG_HAPPENED: {
    //   const {
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     type
    //   } = action.payload;
    //
    //   const newState = [...state];
    //   if (type === "column") {
    //     const column = newState.splice(droppableIndexStart, 1);
    //     newState.splice(droppableIndexEnd, 0, ...column);
    //     return newState;
    //   }
    //
    //   // in the same column
    //   if (droppableIdStart === droppableIdEnd) {
    //     const column = state[droppableIdStart];
    //     const card = column.cards.splice(droppableIndexStart, 1);
    //     column.cards.splice(droppableIndexEnd, 0, ...card);
    //   }
    //
    //   // new column
    //   if (droppableIdStart !== droppableIdEnd) {
    //     //search column where go card
    //     const columnStart = state[droppableIdStart];
    //     // push card in new column
    //     const card = columnStart.cards.splice(droppableIndexStart, 1);
    //     // find column dragend
    //     //
    //     const columnEnd = state[droppableIdEnd];
    //     //put card in ewn column
    //     columnEnd.cards.splice(droppableIndexEnd, 0, ...card)
    //   }
    //   return newState;
    // }

    case CONSTS.EDIT_COLUMN_TITLE: {
      const { columnId, newTitle } = action.payload;
      const newState = [...state];
      const column = state[columnId];
      column.title = newTitle;
      return newState;
    }

    //
    case CONSTS.EDIT_CARD_TITLE: {
      const { columnId, id, newTitle } = action.payload;
      const newState = [...state];
      const cards = state[columnId].cards;
      cards.forEach((card, index) =>{
        if ( card.id === id ) {
          card.text = newTitle;
        }
      });

      return newState;
    }
    case CONSTS.DELETE_COLUMN: {
      const columnId = action.payload;
      const newState = [...state];
      newState.forEach( (item, index) => {
        if ( item.id === columnId ) {
          newState.splice(index, 1);
        }
      });

      return newState;
    }
    case CONSTS.SAVE_DATE: {
      const { columnId, id, newDate } = action.payload;
      const newState = [...state];
      const cards = state[columnId].cards;
      cards.forEach((card, index) =>{
        if ( card.id === id ) {
          card.dateCard = newDate;
        }
      });
      return newState
    }
    default:
      return state
  }
}