import React,{Component} from 'react';
import classes from './Description.css';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';
import {addDescription} from '../../../store/actions/popupAction';

class Description extends Component{

  state = {
    isEditDesc: false,
    description: this.props.description
  };
  handlerDescChange =(e) =>{
    this.setState({
      description: e.target.value
    })
  };
  handleAddDescription = ()=>{
    const {dispatch, columnId, id} = this.props;
    const {description} = this.state;
    if (description === ''){
      this.setState({
        isEditDesc: true,
      });
    } else {
      if(description) {
        dispatch(addDescription(columnId, id, description))
      }
      this.setState({
        isEditDesc: false,
      });
    }
    return;
  };
  renderFormDesc =()=>{
    return (
      <div className={classes.wrapTextarea}>
        <Textarea
          className={classes.Textarea}
          minRows={5}
          value={this.state.description}
          onChange={this.handlerDescChange}
        />
        <div className={classes.wrapBtn}>
          <button
            onClick={this.handleAddDescription}
            className={classes.saveBtn}>
            Зберегти
          </button>
        </div>
      </div>
    )
  };
  renderDesc =() =>{
    return (
      <div>
        {this.state.isEditDesc ? (
          this.renderFormDesc()
        ) : (
          <div onClick={() => this.setState({isEditDesc: true})}>
            {this.props.description}
          </div>
        )}
      </div>
    )
  };
  render() {
    return (
      <div>
        { this.props.description.length ? this.renderDesc() : this.renderFormDesc()}
      </div>
    )


  }
}

export default connect() (Description);