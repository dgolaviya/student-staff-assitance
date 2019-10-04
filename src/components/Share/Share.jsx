import React, { Component } from 'react';
import { TextInput, Button, Textarea, Icon, } from 'react-materialize';
import { connect } from 'react-redux';
import { saveDocument } from '../../actions/actions'

export class Share extends Component {

  state = {
    fileData: '',
    fileName: '',
    docTitle: '',
    docDesc: '',
    docType: 'Article'
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  setFile = (e) => {
    e.preventDefault();
    this.setState({ fileData: e.target.files[0], fileName: e.target.value });
  }

  saveDocument = (e) => {
    e.preventDefault();
    const data = {
      docTitle: this.state.docTitle,
      docDesc: this.state.docDesc,
      docType: this.state.docType
    }
    this.props.saveDocument(this.props.userId, this.state.fileData, JSON.stringify(data));
  }

  render() {
    return (
      <div className="edit-profile">
        <form onSubmit={this.saveDocument} className="edit-profile-form">
          <TextInput
            id="docTitle"
            onChange={this.onChange}
            label="Title"
            value={this.state.docTitle}
          />
          <Textarea label="Description" id="docDesc" onChange={this.onChange} />
          <TextInput disabled value={this.state.fileName} />
          <label htmlFor="doc">
            <Icon className="green-text" medium >cloud_upload</Icon>
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
  saveDocument: (userId, file, data) => dispatch(saveDocument(userId, file, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
