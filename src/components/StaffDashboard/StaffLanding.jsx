import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../actions/actions";
import { Row, Col, Card, Icon } from "react-materialize";

class StaffLanding extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <Row style={{ padding: "0 25px" }}>
        <Col m={3} s={6}>
          <Link to="/dashboard/studentsList">
            <Card className="blue item-card lighten-2">
              <Icon large>account_circle</Icon>
              <div className="card-header">30</div>
              <div>Students List</div>
            </Card>
          </Link>
        </Col>
        <Col m={3} s={6}>
          <Link to="/dashboard/announcements">
            <Card className="blue item-card lighten-2">
              <Icon large>android</Icon>
              <div className="card-header">{this.props.announcementsCount}</div>
              <div>Announcements Notification</div>
            </Card>
          </Link>
        </Col>
        <Col m={3} s={6}>
          <Link to="/dashboard/news">
            <Card className="blue item-card lighten-2">
              <Icon large>announcement</Icon>

              <div className="card-header">{this.props.newsCount}</div>
              <div>News Notification</div>
            </Card>
          </Link>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  announcementsCount: state.events.announcements.length,
  newsCount: state.events.news.length
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffLanding);
