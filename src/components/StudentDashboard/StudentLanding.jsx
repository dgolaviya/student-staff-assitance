import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Icon } from 'react-materialize';
import { fetchEvents } from "../../actions/actions";


class StudentLanding extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    return (
      <>
        <div style={{ marginTop: "4rem" }}>
          <h5>News</h5>
          <Row style={{ padding: '0 25px' }}>
            {this.props.news.map(news => (
              <Col m={3} s={6}>
                <Card className="blue item-card lighten-2">
                  <div className="card-header">{news.eventName}</div>
                  <div className="card-body">{news.eventDesc}</div>
                </Card>
              </Col>
            ))}
          </Row>
          <h5>Blog</h5>
        </div>
      </>
    );
  }
}
StudentLanding.propTypes = {
};

const mapStateToProps = state => ({
  announcements: state.events.announcements,
  news: state.events.news
});


const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents())
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentLanding);