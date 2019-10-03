import React, { Component } from 'react';
import { TextInput, Button, Textarea, Icon,  } from 'react-materialize';
import { connect } from 'react-redux';
import { saveDocument } from '../../actions/actions'

export class Share extends Component {

  state = {
    fileData: '',
    fileName: ''
  }

  setFile = (e) => {
    e.preventDefault();
    this.setState({ fileData: e.target.files[0], fileName: e.target.value });
  }

  saveDocument = (e) => {
    e.preventDefault();
    this.props.saveDocument(this.props.userId, this.state.fileData);
  }

  render() {
    return (
      <div className="edit-profile">
        <form onSubmit={this.saveDocument} className="edit-profile-form">
          <TextInput
            id="title"
            onChange={this.onChange}
            label="Title"
            value={this.state.title}
          />
          <Textarea label="Description" />
          <TextInput disabled value={this.state.fileName} />
          <label htmlFor="doc">
            <Icon className="green-text" large>cloud_upload</Icon>
          </label>
          <input
            type="file"
            name="doc"
            id="doc"
            style={{ display: 'none' }}
            onChange={this.setFile}
          />
          <Button
            className="blue"
            style={{ margin: '30px' }}
            blue
            large
            waves="light"
            type="submit"
          >Save Changes</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.userId
});

const mapDispatchToProps = dispatch => ({
  saveDocument: (userId, file) => dispatch(saveDocument(userId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
