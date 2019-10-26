import {CONSTS} from "./actionTypes";

export const editCardTitle = (columnId, id, newTitle) => {
  return {
    type: CONSTS.EDIT_CARD_TITLE,
    payload: {
      columnId,
      id,
      newTitle
    }
  };
};
export const saveDate = (columnId, id, newDate) => {
  return {
    type: CONSTS.SAVE_DATE,
    payload: {
      columnId,
      id,
      newDate
    }
  }
};

export const addDescription = (columnId, id, newDescription) =>{
  return {
    type: CONSTS.ADD_DESCRIPTION,
    payload: {
      columnId,
      id,
      newDescription
    }
  }
};