import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents, getAllUsers } from "../../actions/actions";
import { Row, Col, Card, Icon } from "react-materialize";

class StaffLanding extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
    this.props.getAllUsers();
  }

  render() {
    return (
      <Row style={{ padding: "0 25px" }}>
        <Col m={3} s={6}>
          <Link to="/dashboard/studentsList">
            <Card className="blue item-card lighten-2">
              <Icon large className="black-text">
                account_circle
              </Icon>
              <div className="card-header black-text">
                {this.props.studentsCount}
              </div>
              <div className="black-text">Students List</div>
            </Card>
          </Link>
        </Col>
        <Col m={3} s={6}>
          <Link to="/dashboard/announcements">
            <Card className="blue item-card lighten-2">
              <Icon large className="black-text">
                android
              </Icon>
              <div className="card-header black-text">
                {this.props.announcementsCount}
              </div>
              <div className="black-text">Announcements Notification</div>
            </Card>
          </Link>
        </Col>
        <Col m={3} s={6}>
          <Link to="/dashboard/news">
            <Card className="blue item-card lighten-2">
              <Icon large className="black-text">
                announcement
              </Icon>

              <div className="card-header black-text">
                {this.props.newsCount}
              </div>
              <div className="black-text">News Notification</div>
            </Card>
          </Link>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  announcementsCount: state.events.announcements.length,
  newsCount: state.events.news.length,
  studentsCount: state.auth.allUsers.filter(user => user.roleId === "3").length
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  getAllUsers: () => dispatch(getAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffLanding);
