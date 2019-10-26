import React, {useState} from 'react';
import {connect} from 'react-redux';
import classes from './Columns.css';
import Cards from '../Cards/Cards';
import AddButton from '../AddButton/AddButton';
import Textarea from 'react-textarea-autosize';
// import {Droppable, Draggable} from 'react-beautiful-dnd';
import {editTitle, deleteColumn} from '../../store/actions/columnsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Columns = ({title, cards, columnId, dispatch}) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const handleAddOnEnter = e => {
    if ( e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      dispatch(editTitle(columnId, e.target.value));
    }
  };
  const handleFocus = e => {
    e.target.select();
  };
  const handleChange = e => {
    e.preventDefault();
    setColumnTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(columnId, e.target.value));
  };
  const renderInputColumnTitle = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <Textarea
          className={classes.Textarea}
          value={columnTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
          onKeyDown={handleAddOnEnter}
        />
      </form>
    );
  };
  const handleDeleteList = (e) => {
    dispatch(deleteColumn(columnId));
  };


  return (
    <div className={classes.ColumnsItem}>
      <div className={classes.ColumnsHeader}>
        {isEditing ? (
          renderInputColumnTitle()
        ) : (
          <div onClick={() => setIsEditing(true)} className={classes.ColumnName}>
            <div style={{padding: '0 0 0 10px'}}>{title}</div>
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteList} className={classes.DeleteBtn}/>
          </div>
        )}
      </div>
      {
        cards.map((card, index)=>{
          return (
            <Cards
              key={card.id}
              index={index}
              text={card.text}
              id={card.id}
              dateCard={card.dateCard}
              description={card.description}
              columnId={columnId}
              type={card.type}
            />
          )
        })
      }
      <AddButton columnId={columnId} cards={cards} type='card'/>
    </div>
  )
  // return (
  //
  //   <Draggable draggableId={String(columnId)} index={index}>
  //     {provided=>(
  //       <div {...provided.draggableProps}
  //            {...provided.dragHandleProps}
  //            ref={provided.innerRef}
  //            className={classes.ColumnsItem}
  //       >{/*cards container*/}
  //       <div onMouseDown={handleDeleteList} className={classes.DeleteBtn}>
  //         XXXXXXXXXXXXXXXXXXX
  //       </div>
  //         <Droppable droppableId={String(columnId)} type="card">
  //           {provided => (
  //             <div
  //               {...provided.draggableProps}
  //               ref={provided.innerRef}
  //             >
  //               <div>
  //                 {isEditing ? (
  //                   renderInputColumnTitle()
  //                 ) : (
  //                   <div onClick={() => setIsEditing(true)}>
  //                     <h4 className={classes.ColumnName}>{title}</h4>
  //                   </div>
  //                 )}
  //               </div>
  //               {
  //                 cards.map((card, index)=>{
  //                   return (
  //                     <Cards
  //                       key={card.id}
  //                       index={index}
  //                       text={card.text}
  //                       id={card.id}
  //                       columnId={columnId}
  //                     />
  //                   )
  //                 })
  //               }
  //               <AddButton columnId={columnId} cards={cards} type='card'/>
  //               {provided.placeholder}
  //             </div>
  //           )}
  //         </Droppable>
  //       </div>
  //     )}
  //   </Draggable>
  //
  // )
};
const mapStateToProps = state => ({
  columns: state.columns,
});


export default connect(mapStateToProps)(Columns) ;