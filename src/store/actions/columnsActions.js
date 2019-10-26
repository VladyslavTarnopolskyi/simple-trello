import {CONSTS} from "./actionTypes";

export const addColumn = (title)=>{
  return {
    type: CONSTS.ADD_COLUMN,
    payload: title
  }
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
)=>{
  return {
    type: CONSTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  }
};
export const editTitle = (columnId, newTitle) => {
  return {
    type: CONSTS.EDIT_COLUMN_TITLE,
    payload: {
      columnId,
      newTitle
    }
  };
};

export const deleteColumn = columnId => {
  return {
    type: CONSTS.DELETE_COLUMN,
    payload: columnId

  }
};