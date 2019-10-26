import React, { Component } from 'react';
import classes from './App.css';
import Columns from './Columns/Columns';
import {connect} from 'react-redux';
import AddButton from "./AddButton/AddButton";
// import {DragDropContext, Droppable} from 'react-beautiful-dnd';
// import {sort} from '../store/actions/columnsActions';


class App extends Component {
  // onDragEnd=(result)=>{
  //   const {destination, source, draggableId, type} = result;
  //   if(!destination){
  //     return
  //   }
  //   this.props.dispatch(sort(
  //     source.droppableId,
  //     destination.droppableId,
  //     source.index,
  //     destination.index,
  //     draggableId,
  //     type
  //   ))
  //
  // };

  render() {

    const {columns} = this.props;
    return (
      <div className={classes.App}>
        <header>
          <h1 className={classes.AppH}>Simple trello</h1>
        </header>
        <section
          className={classes.AppWrapper}> {/*column container*/}
          {
            columns.map((column, index)=>{
              return (
                <Columns
                  columnId={column.id}
                  key={column.id}
                  title={column.title}
                  cards={column.cards}
                  index={index}
                />
              )
            })
          }
          <div className={classes.WrapBtn}>
            <AddButton columns={columns} type='column'/>
          </div>
        </section>
      </div>
    );
    // return (
    //   <DragDropContext onDragEnd={this.onDragEnd}>
    //     <div className={classes.App}>
    //       <header>
    //         <h1>Simple trello</h1>
    //       </header>
    //       <Droppable droppableId="all-lists" direction="horizontal" type="column">
    //         {provided => (
    //         <section
    //           {...provided.droppableProps}
    //           ref={provided.innerRef}
    //           className={classes.AppWrapper}> {/*column container*/}
    //                 {
    //                   columns.map((column, index)=>{
    //                     return (
    //                       <Columns
    //                         columnId={column.id}
    //                         key={column.id}
    //                         title={column.title}
    //                         cards={column.cards}
    //                         index={index}
    //                       />
    //                     )
    //                   })
    //                 }
    //           {provided.placeholder}
    //             <div className={classes.WrapBtn}>
    //               <AddButton columns={columns} type='column'/>
    //             </div>
    //         </section>
    //           )}
    //       </Droppable>
    //     </div>
    //   </DragDropContext>
    // );
  }
}
const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(App);
