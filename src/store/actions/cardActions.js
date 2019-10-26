import {CONSTS} from "./actionTypes";

export const addCard = (text, columnId, id )=>{
  return {
    type: CONSTS.ADD_CARD,
    payload: { text, columnId, id }
  }
};
export const deleteCard = (columnId, id ) => {
  return {
    type: CONSTS.DELETE_CARD,
    payload: {
      columnId,
      id
    }
  }
};

export const changeBgColor = (columnId, id, newBgColor )=>{
  return {
    type: CONSTS.CHANGE_COLOR,
    payload: {columnId, id, newBgColor}
  }
};