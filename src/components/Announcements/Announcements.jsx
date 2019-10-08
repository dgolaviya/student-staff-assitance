import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setDiscussionThreadEditId, fetchEvents, deleteEvent } from "../../actions/actions";
import { Table, Button } from "react-materialize";

class Announcements extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  deleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
    setTimeout(() => {
      this.props.fetchEvents();
    },1000);
  }

  render() {
    return (
      <div>
        <h3>Announcements</h3>
        {this.props.userAccess !== "3" ? (
          <Link to="/dashboard/announcements/createOrUpdate">
            <Button>Create</Button>
          </Link>
        ) : (
          ""
        )}
        <hr />
        <Table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Created By</th>
              {this.props.userAccess !== "3" ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {this.props.announcements.length > 0 ? (
              this.props.announcements.map((v, i) => (
                <tr key={i}>
                  <td>{v.eventName}</td>
                  <td>{v.eventDesc}</td>
                  <td>{v.eventType}</td>
                  <td>{v.eventDate}</td>
                  <td>{v.createdByUsername}</td>
                  {this.props.userAccess !== "3" ? (
                    <td>
                      <Link
                        to={{
                          pathname: "/dashboard/announcements/createOrUpdate",
                          data: {
                            eventId: v.eventId,
                            eventName: v.eventName,
                            eventDesc: v.eventDesc,
                            eventDate: v.eventDate,
                            eventType: v.eventType,
                            createdBy: v.createdBy,
                            createdByUsername: v.createdByUsername,
                            eventCategory: v.eventCategory,
                            timestamp: v.timestamp,
                            updatedBy: v.updatedBy,
                            updatedByUsername: v.updatedByUsername
                          }
                        }}
                      >
                        Edit
                      </Link>
                      <div>{this.props.userAccess === "1" ? <a href="javascript:;" onClick={this.deleteEvent(v.eventId)}>Delete</a> : ''}</div>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Data Yet!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  announcements: state.events.announcements,
  userAccess: state.auth.user.roleId
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcements);
