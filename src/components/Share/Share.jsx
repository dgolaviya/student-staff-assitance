import React, { Component } from 'react';
import { TextInput, Button, Textarea } from 'react-materialize';
import { connect } from 'react-redux';

export class Share extends Component {
  render() {
    return (
      <div className="edit-profile">
        <form onSubmit={this.updateUserInfo} className="edit-profile-form">
          <TextInput
            id="firstName"
            // onChange={this.onChange}
            label="First Name"
            value=''
          />
          <Textarea label="Description" />
          <input
            // id="firstName"
            // onChange={this.onChange}
            type="file"
            label="First Name"
            value=''
          />
          <Button
            className="blue"
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

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
