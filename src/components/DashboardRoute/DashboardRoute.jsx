import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentDashboard from '../StudentDashboard';
import AdminDashboard from "../AdminDashboard";
import StaffDashboard from "../StaffDashboard";

class DashboardRoute extends Component {
  render() {
    const { roleId } = this.props;
    let RenderComponent = StudentDashboard;
    if (roleId === '1') {
      RenderComponent = AdminDashboard;
    } else if (roleId === '2') {
      RenderComponent = StaffDashboard;
    }
    return <RenderComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  roleId: state.auth.user.roleId
})

export default connect(mapStateToProps)(DashboardRoute)
