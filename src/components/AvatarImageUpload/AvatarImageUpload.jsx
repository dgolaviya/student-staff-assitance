import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';
import { uploadAvatar } from '../../actions/actions'

import './styles.scss';

class AvatarImageUpload extends Component {
  state = {
    fileData: ''
  }
  setFile = (e) => {
    this.setState({ fileData: e.target.files[0] });
  }
  submitImage = (e) => {
    e.preventDefault();
    console.log(this.props.userId, this.state.fileData);
    this.props.saveAvatar(this.props.userId, this.state.fileData);
  }
  render() {
    console.log(this.state);
    return (
      <form className="user-avatar-container" onSubmit={this.submitImage} enctype="multipart/form-data">
        <div>
          <label htmlFor="avatar-upload">
            <img
              className="avatar-image circle responsive-img"
              alt=""
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            />
          </label>
        </div>
        <input
          type="file"
          id="avatar-upload"
          name="avatar-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={this.setFile}
        />
        <button
          className="btn btn-large waves-effect waves-light hoverable red upload-button"
          blue
          large
          waves="light"
          type="submit"
        ><Icon>add</Icon> Upload Avatar
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.userId
})

const mapDispatchToProps = dispatch => ({
  saveAvatar: (userId, userData) => dispatch(uploadAvatar(userId, userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarImageUpload)
