import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Card, Row, Col, Icon } from 'react-materialize';
import { fetchEvents } from "../../actions/actions";


class StudentLanding extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    return (
      <div className="row">
        <div className="col s8">
          <div style={{ marginTop: "4rem" }}>
            <h5>News</h5>
            <Row style={{ padding: '0 25px' }}>
              {this.props.news.map(news => (
                <Col m={3} s={6} key={news.eventId}>
                  <Card className="blue item-card lighten-2">
                    <div className="card-header">{news.eventName}</div>
                    <div className="card-body">{news.eventDesc}</div>
                  </Card>
                </Col>
              ))}
            </Row>
            <h5>Blog</h5>
            <Row style={{ padding: '0 25px' }}>
              {this.props.blogPosts.map((post, index) => (
                <Col m={3} s={6} key={index}>
                  <Card className="blue item-card lighten-2">
                    <div className="card-header">{post.title}</div>
                    <div className="card-body">{post.description}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="col s4">
          <div style={{ marginTop: "4rem" }}>
            <h5>Announcements</h5>
            <Row style={{ padding: '0 25px' }}>
              {this.props.announcements.map((a, index) => (
                <Col s={12} key={index}>
                  <Card className="blue item-card lighten-2">
                    <div className="card-header"><b>{a.eventDate}</b><div>{a.eventName}</div></div>
                    <div className="card-body">{a.eventDesc}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
StudentLanding.defaultProps = {
  blogPosts: []
};
StudentLanding.propTypes = {
  blogPosts: PropTypes.array
};

const mapStateToProps = state => ({
  announcements: state.events.announcements,
  news: state.events.news,
  blogPosts: state.events.blogPosts
});


const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents())
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentLanding);