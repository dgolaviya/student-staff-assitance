import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';
import { uploadAvatar, fetchAvatarImage } from '../../actions/actions'
import defaultAvatar from '../../assets/avatar.png'

import './styles.scss';

class AvatarImageUpload extends Component {
  state = {
    fileData: '',
    imagePreviewUrl: ''
  }
  componentDidMount() {
    this.props.fetchAvatarImage(this.props.userId);
  }
  setFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        fileData: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
    this.setState({ fileData: e.target.files[0] });
  }
  submitImage = (e) => {
    e.preventDefault();
    this.props.saveAvatar(this.props.userId, this.state.fileData);
    setTimeout(() => {
      this.props.fetchAvatarImage(this.props.userId);
    }, 1500);
  }
  render() {
    const { avatarDetail: { avatar, contentType } } = this.props;
    let { imagePreviewUrl } = this.state;
    let imagePreview = avatar ? <img
      className="avatar-image circle responsive-img"
      alt=""
      src={`data:${contentType};base64, ${avatar}`}
    /> : <img alt="" src={defaultAvatar} className="avatar-image circle responsive-img" />;
    if (imagePreviewUrl) {
      imagePreview = (<img alt="" src={imagePreviewUrl} className="avatar-image circle responsive-img" />);
    }
    return (
      <form className="user-avatar-container" onSubmit={this.submitImage} encType="multipart/form-data">
        <div>
          <label htmlFor="avatar-upload">
            {imagePreview}
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
          disabled={!this.state.fileData}
          type="submit"
        ><Icon>add</Icon> Upload Avatar
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.userId,
  avatarDetail: state.auth.avatarDetail
})

const mapDispatchToProps = dispatch => ({
  saveAvatar: (userId, userData) => dispatch(uploadAvatar(userId, userData)),
  fetchAvatarImage: (userId) => dispatch(fetchAvatarImage(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarImageUpload)
