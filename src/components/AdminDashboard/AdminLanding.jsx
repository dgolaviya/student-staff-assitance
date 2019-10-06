import React from 'react';
import { Card, Row, Col, Icon, CardPanel } from 'react-materialize';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllUsers } from "../../actions/actions";

class AdminLanding extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    return (
      <>
        <Row style={{ padding: '0 25px' }}>
          <div className="col s12">
            <CardPanel className="teal white-text p-10">
              <p>Hi, <b>{this.props.user.firstName} {this.props.user.lastName}</b><br />
                <b><i>Welcome to ABC University admin portal</i></b></p>
            </CardPanel>
          </div>
          <Col m={3} s={6}>
            <Card className="blue item-card lighten-2">
              <Link to="/dashboard/approve-enrollment">
                <Icon large className="black-text">check</Icon>
                {/* <div className="card-header">10</div> */}
                <div className="black-text">Approve enrollment</div>
              </Link>
            </Card>
          </Col>
          <Col m={3} s={6}>
            <Card className="blue item-card lighten-2">
              <Link to={{ pathname: '/dashboard/manage-users', filterUser: "2" }}>
                <Icon large className="black-text">group</Icon>
                <div className="card-header black-text">{this.props.staffUsers.length || 0}</div>
                <div className="black-text">Staff users</div>
              </Link>
            </Card>
          </Col>
          <Col m={3} s={6}>
            <Card className="blue item-card lighten-2">
              <Link to={{ pathname: '/dashboard/manage-users', filterUser: "3" }}>
                <Icon large className="black-text">face</Icon>
                <div className="card-header black-text">{this.props.studentUsers.length || 0}</div>
                <div className="black-text">Students</div>
              </Link>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return ({
    studentUsers: state.auth.allUsers.filter(user => user.roleId === "3"),
    staffUsers: state.auth.allUsers.filter(user => user.roleId === "2"),
    user: state.auth.user
  })
};


const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminLanding);