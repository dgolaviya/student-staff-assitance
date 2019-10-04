import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-materialize';
import { getActivityLogs } from '../../actions/actions';

export class ActivityLog extends Component {
  componentDidMount() {
    if (this.props.user.roleId === "1") {
      this.props.getActivityLogs();
    }
    else {
      this.props.getActivityLogs(this.props.user.userId);
    }
  }
  render() {
    const { activities } = this.props
    return (
      <div>
        <h3>Activity/Report</h3>
        <Table>
          <thead>
            <tr>
              <th data-field="id">Description</th>
              <th data-field="name">User Name</th>
              <th data-field="price">Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr>
                <td>{activity.description}</td>
                <td>{activity.userName}</td>
                <td>{activity.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  getActivityLogs: (userId) => dispatch(getActivityLogs(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
