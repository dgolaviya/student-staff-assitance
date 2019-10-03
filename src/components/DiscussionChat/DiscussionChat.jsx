import React from "react";
import { connect } from "react-redux";
import {
  setDiscussionThreadEditId,
  fetchDiscussionChats,
  createDiscussionChat
} from "../../actions/actions";
import { Row, Col, Card, Button } from "react-materialize";
import Textarea from "react-materialize/lib/Textarea";

class DiscussionChat extends React.Component {
  state = {
    topicName: "Topic Name",
    topicDesc: "Topic Description",
    chatDesc: ""
  };

  componentDidMount() {
    this.props.fetchDiscussionChats(this.props.location.discussionThreadId);
    this.setState({
      topicName: this.props.location.topicName,
      topicDesc: this.props.location.topicDesc
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDiscussionChatsUpdated) {
      this.props.fetchDiscussionChats(this.props.location.discussionThreadId);
      this.setState({ chatDesc: "" });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addUpdateDiscussionChat = e => {
    e.preventDefault();
    let data = {
      discChatId: "",
      discThreadId: this.props.location.discussionThreadId,
      timestamp: "",
      userId: this.props.userId,
      userName: "",
      chatDesc: this.state.chatDesc
    };
    this.props.createDiscussionChat(
      data,
      this.props.userId,
      this.props.location.discussionThreadId
    );
  };

  render() {
    return (
      <div>
        <h3>{this.state.topicName}</h3>
        <hr />
        <p>{this.state.topicDesc}</p>
        <Row>
          <Col m={6} s={12}>
            {this.props.discussionChatsRelatedToThread.length > 0
              ? this.props.discussionChatsRelatedToThread.map((v, i) => (
                  <Card
                    key={i}
                    className="white z-depth-2"
                    title={v.userName + " on " + v.timestamp.substr(0, 10)}
                  >
                    <p>{v.chatDesc}</p>
                  </Card>
                ))
              : ""}
          </Col>
        </Row>
        <Row>
          <Col m={6} s={12}>
            <form
              onSubmit={this.addUpdateDiscussionChat}
              style={{ width: "100%" }}
            >
              <Textarea
                id="chatDesc"
                onChange={this.onChange}
                label="What's on your mind?"
                value={this.state.chatDesc}
                s={10}
              />
              <Button className="blue" waves="light" type="submit">
                comment
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  discussionChatsRelatedToThread:
    state.discussions.discussionChatsRelatedToThread,
  userId: state.auth.user.userId,
  isDiscussionChatsUpdated: state.discussions.isDiscussionChatsUpdated
});

const mapDispatchToProps = dispatch => ({
  fetchDiscussionChats: discussionThreadId =>
    dispatch(fetchDiscussionChats(discussionThreadId)),
  createDiscussionChat: (data, userId, discussionThreadId) =>
    dispatch(createDiscussionChat(data, userId, discussionThreadId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionChat);
