import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button } from "react-materialize";
import { Link } from "react-router-dom";
import {
  createDiscussionThread,
  updateDiscussionThread
} from "../../actions/actions";
import "./styles.scss";
import Textarea from "react-materialize/lib/Textarea";
class EditDiscussionThread extends Component {
  state = {
    discussionThreadId: this.props.discussionThreadId,
    topicName: this.props.topicName,
    topicDesc: this.props.topicDesc,
    timestamp: this.props.timestamp,
    createdBy: this.props.createdBy,
    createdByUserName: this.props.createdByUserName,
    updatedBy: this.props.updatedBy,
    updatedByUserName: this.props.updatedByUserName
  };

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.isDiscussionThreadsUpdated) {
      this.setState({
        topicName: "",
        topicDesc: ""
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addUpdateDiscussionThread = e => {
    e.preventDefault();
    let data = {
      ...this.state
    };
    if (this.state.discussionThreadId === "") {
      this.props.createDiscussionThread(data, this.props.userId);
    } else {
      this.props.updateDiscussionThread(data, this.props.userId);
    }
  };

  render() {
    return (
      <div className="edit-profile">
        <h3>
          {this.props.discussionThreadId === ""
            ? "Create Discussion Thread"
            : "Update Discussion Thread"}
        </h3>
        <form
          onSubmit={this.addUpdateDiscussionThread}
          className="edit-profile-form"
        >
          <TextInput
            id="topicName"
            onChange={this.onChange}
            label="Topic Name"
            value={this.state.topicName}
          />
          <Textarea
            id="topicDesc"
            onChange={this.onChange}
            label="Topic Description"
            value={this.state.topicDesc}
            maxlength={900}
          />
          <Button className="blue" large waves="light" type="submit">
            Save Changes
          </Button>
          <br />
          <Link to="/dashboard/discussion-threads">
            <Button large waves="light" type="cancel">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let data = {
    discussionThreadId: "",
    topicName: "",
    topicDesc: "",
    timestamp: "",
    createdBy: "",
    createdByUserName: "",
    updatedBy: "",
    updatedByUserName: ""
  };
  if (state.discussions.discussionThreadUpdateId) {
    state.discussions.discussionThreads.forEach(v => {
      if (v.discussionThreadId === state.discussions.discussionThreadUpdateId) {
        data = { ...v };
      }
    });
  }

  return {
    ...data,
    userId: state.auth.user.userId,
    isDiscussionThreadsUpdated: state.discussions.isDiscussionThreadsUpdated
  };
};

const mapDispatchToProps = dispatch => ({
  createDiscussionThread: (data, userId) =>
    dispatch(createDiscussionThread(data, userId)),
  updateDiscussionThread: (data, userId) =>
    dispatch(updateDiscussionThread(data, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDiscussionThread);
