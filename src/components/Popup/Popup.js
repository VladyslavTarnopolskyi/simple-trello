import React, {useState} from 'react';
import classes from './Popup.css';
import {editCardTitle, saveDate} from "../../store/actions/popupAction";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Description from "./Description/Description";
import Textarea from 'react-textarea-autosize';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAlignLeft, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';

const Popup =({text, id, columnId, dateCard, description, changeColor, closePopup, dispatch}) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardTitle] = useState(text);
  const [startDate, setDate] = useState(dateCard);
  const handleEdit = ()=>{
    setIsEditing(true);
  };
  const handleFocus = e => {
    e.target.select();
  };
  const handleChange = e => {
    e.preventDefault();
    setCardTitle(e.target.value);
  };
  const handleChangeDate = date => {
    setDate(date)
  };
  const handleSelectDate = date => {
    dispatch(saveDate(columnId, id, date));
  };

  //
  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editCardTitle(columnId, id, e.target.value));
  };
  const renderInputColumnTitle = () => {
    return (
      <form onSubmit={handleFinishEditing}>

        <Textarea
          className={classes.Textarea}
          value={cardText}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  return (

    <div className={classes.Popup}>

      <div className={classes.PopupInner}>
        <FontAwesomeIcon className={classes.closePopup} icon={faTimes} onClick={closePopup}/>
        <div className={classes.wrapItem}>
          <FontAwesomeIcon icon={faAlignLeft} className={classes.Icons}/>
          {isEditing ? (
            renderInputColumnTitle()
          ) : (
            <div onClick={handleEdit} style={{fontWeight: 'bold'}}>{text}</div>
          )}
        </div>
        <div className={classes.wrapItem}>
          <FontAwesomeIcon icon={faClock} className={classes.Icons}/>
          <span>
            Виберіть дату закриття картки
          </span>
        </div>
        <div className={classes.wrapItem}>
          <DatePicker
            selected={startDate}
            onSelect={handleSelectDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className={classes.wrapItem}>
          <FontAwesomeIcon icon={faEdit} className={classes.Icons}/>
          <span>Опис</span>
        </div>
        <Description description={description} columnId={columnId} id={id}/>
      </div>
    </div>
  )

};

export default connect()(Popup);