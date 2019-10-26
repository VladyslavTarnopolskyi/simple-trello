import React,{Component} from 'react';
import classes from './AddButton.css';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';
import {addColumn} from '../../store/actions/columnsActions';
import {addCard} from '../../store/actions/cardActions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faPlus} from '@fortawesome/free-solid-svg-icons'
class AddButton extends Component{

  state = {
    isOpen: false,
    text: ''
  };

  openForm = () =>{
    this.setState({
      isOpen: true
    })
  };
  closeForm = (e)=>{
    this.setState({
      isOpen: false
    })
  };
  handlerInputChange =(e) =>{
    this.setState({
      text: e.target.value
    })
  };

  handleAddColumn = () => {
    const {dispatch} = this.props;
    const {text} = this.state;

    if(text) {
      this.setState({
        text:''
      });
      dispatch(addColumn(text))
    }
    return;
  };
  handleAddCard = () => {
    const {dispatch, id, columnId} = this.props;
    const {text} = this.state;

    if(text) {
      this.setState({
        text:''
      });
      dispatch(addCard(text, columnId, id))
    }
    return;
  };


  //
  renderAddBtn =()=>{
    const {columns}  = this.props;
    const cls = [
      classes.AddButton,
      classes[this.props.type]
    ];
    const btnName = columns ? 'Додати нову колонку' : 'Додати нову картку';
    return (
      <div
        className={cls.join(' ')}
        onClick={this.openForm}
      >
        <FontAwesomeIcon icon={faPlus} className={classes.faplus}/>
        <p> {btnName}</p>
      </div>
    )
  };

  renderForm = () =>{
    const {columns} = this.props;
    const placeholder = columns ? 'Введіть назву колонки' : 'Введіть назву картки';
    const btnAdd = columns ? 'Додати колонку': 'Додати картку';

    return (

      <div className={classes.FormWrapper}>
        <div className={classes.wrapTextarea}>
          <Textarea
            className={classes.Textarea}
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handlerInputChange}
          />
        </div>

        <div className={classes.wrapBtn}>
          <button
            onMouseDown={columns ? this.handleAddColumn : this.handleAddCard}
            className={classes.saveBtn}>
            {btnAdd}
          </button>
          <FontAwesomeIcon
            className={classes.cancelBtn}
            icon={faTimes}
            onClick={this.closeForm}
          />
        </div>
      </div>
    )
  };

  render() {
    return this.state.isOpen ? this.renderForm() : this.renderAddBtn();
  }
}

export default connect() (AddButton);