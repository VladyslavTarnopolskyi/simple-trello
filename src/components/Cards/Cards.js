import React, {useState} from 'react';
import classes from "../Cards/Cards.css";
// import {Draggable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import {deleteCard, changeBgColor} from '../../store/actions/cardActions';
import Popup from '../Popup/Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const Cards =({text, columnId, id, dateCard, type, description, index, dispatch})=> {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [cardColor, setColor] = useState(type);

  const handleDeleteCard = (e) => {
    dispatch(deleteCard(columnId, id));
  };
  const handleChangeColor = (e) => {
    const curDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).valueOf();
    const cardDATE = new Date(dateCard.getFullYear(), dateCard.getMonth(), dateCard.getDate()).valueOf();

    if (cardDATE > curDate) {
      setColor('oneDayToClosed')
    } else if (cardDATE === curDate) {
      setColor('closedDay');
    } else if (cardDATE < curDate){
      setColor('closedCard');
    }

    dispatch(changeBgColor(columnId, id, cardColor));
  };
  const closePopup = () =>{
    handleChangeColor();
    setIsOpenPopup(false);
  };
  const showPopup = () =>{
    return (
      <div>
        <FontAwesomeIcon icon={faPen} className={classes.cardBtn}/>
        <Popup
          text={text}
          columnId={columnId}
          id={id}
          index={index}
          dateCard={dateCard}
          description={description}
          closePopup={closePopup}
          changeColor={handleChangeColor}
        />
      </div>
    )
  };

  return (
    <div className={classes.Cards + ' '+ classes[cardColor]}>
      {text}
      <div className={classes.wrapCardBtn}>
        {isOpenPopup ? (
          showPopup()
        ) : (
          <FontAwesomeIcon icon={faPen} className={classes.cardBtn} onClick={() => setIsOpenPopup(true)}/>
        )}
        <FontAwesomeIcon icon={faTrash} className={classes.cardBtn} onMouseDown={handleDeleteCard} />
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  columns: state.columns,
});

export default connect(mapStateToProps)(Cards);

// {/*<Draggable draggableId={String(columnId)} index={index}>*/}
//   {/*{provided =>(*/}
//     {/*<div>*/}
//       {/*<div ref={provided.innerRef}*/}
//            {/*{...provided.draggableProps}*/}
//            {/*{...provided.dragHandleProps}*/}
//       {/*>*/}
//         {/*<h4 className={classes.Cards}*/}
//         {/*>{text}</h4>*/}
//         {/*<div >delete</div>*/}
//       {/*</div>*/}
//     {/*</div>*/}
//
//   {/*)}*/}
// {/*</Draggable>*/}

