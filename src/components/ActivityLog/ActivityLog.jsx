import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-materialize';
import { getActivityLogs } from '../../actions/actions';

export class ActivityLog extends Component {
  componentDidMount() {
    this.props.getActivityLogs();
  }
  render() {
    const { activities } = this.props
    return (
      <div>
        <h3>Activity Trace Logs</h3>
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
  activities: state.activities
});

const mapDispatchToProps = dispatch => ({
  getActivityLogs: () => dispatch(getActivityLogs())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
