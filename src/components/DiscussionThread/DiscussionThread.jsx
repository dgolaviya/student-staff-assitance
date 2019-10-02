import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchDiscussionThreads,
  setDiscussionThreadEditId
} from "../../actions/actions";
import { Table, Button } from "react-materialize";

class DiscussionThread extends React.Component {
  componentDidMount() {
    this.props.fetchDiscussionThreads();
  }

  render() {
    return (
      <div>
        <h3>Discussion Threads</h3>
        <Link to="/dashboard/discussion-threads/createOrUpdate">
          <Button onClick={this.props.setDiscussionThreadEditId("")}>
            Create
          </Button>
        </Link>
        <hr />
        <Table>
          <thead>
            <tr>
              <td>Topic Name</td>
              <td>Topic Description</td>
              <td>Created By</td>
              <td>Timestamp</td>
            </tr>
          </thead>
          <tbody>
            {this.props.discussionThreads.length > 0 ? (
              this.props.discussionThreads.map((v, i) => (
                <tr key={i}>
                  <td>{v.topicName}</td>
                  <td>{v.topicDesc.substr(0, 30) + " ..."}</td>
                  <td>{v.createdByUserName}</td>
                  <td>{v.timestamp.substr(0, 10)}</td>
                  <td
                    onClick={() =>
                      this.props.setDiscussionThreadEditId(v.discussionThreadId)
                    }
                  >
                    <Link to="/dashboard/discussion-threads/createOrUpdate">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Data Yet!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  discussionThreads: state.discussions.discussionThreads
});

const mapDispatchToProps = dispatch => ({
  fetchDiscussionThreads: () => dispatch(fetchDiscussionThreads()),
  setDiscussionThreadEditId: discussionThreadId =>
    dispatch(setDiscussionThreadEditId(discussionThreadId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionThread);
