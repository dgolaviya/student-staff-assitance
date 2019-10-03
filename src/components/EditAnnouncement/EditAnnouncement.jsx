import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, DatePicker } from "react-materialize";
import { Link } from "react-router-dom";
import { createEvent, updateEvent } from "../../actions/actions";
import "./styles.scss";
import Select from "react-materialize/lib/Select";
class EditAnnouncement extends Component {
  state = {
    eventName: "",
    eventDesc: "",
    eventDate: new Date(),
    eventType: "Seminar",
    createdBy: "",
    createdByUsername: "",
    eventCategory: "announcement",
    timestamp: "",
    updatedBy: "",
    updatedByUsername: ""
  };

  componentDidMount() {
    if (this.props.location.data) {
      this.setState({
        ...this.props.location.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAnnouncementsUpdated) {
      this.setState({
        eventName: "",
        eventDesc: "",
        eventDate: new Date(),
        eventType: "Seminar",
        createdBy: "",
        createdByUsername: "",
        eventCategory: "announcement",
        timestamp: "",
        updatedBy: "",
        updatedByUsername: ""
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDateChange = e => {
    this.setState({ eventDate: e });
  };

  addUpdateEvent = e => {
    e.preventDefault();
    let data = {
      eventDate: this.state.eventDate,
      eventDesc: this.state.eventDesc,
      eventId: this.state.eventId,
      eventName: this.state.eventName,
      eventType: this.state.eventType,
      createdBy: this.state.createdBy,
      createdByUsername: this.state.createdByUsername,
      eventCategory: this.state.eventCategory,
      timestamp: this.state.timestamp,
      updatedBy: this.state.updatedBy,
      updatedByUsername: this.state.updatedByUsername
    };
    if (this.props.location.data) {
      this.props.updateEvent(data, this.props.userId);
    } else {
      this.props.createEvent(data, this.props.userId);
    }
  };

  render() {
    return (
      <div className="edit-profile">
        <h3>
          {this.props.location.data
            ? "Update Announcement"
            : "Create Announcement"}
        </h3>
        <form onSubmit={this.addUpdateEvent} className="edit-profile-form">
          <TextInput
            id="eventName"
            onChange={this.onChange}
            label="Event Name"
            value={this.state.eventName}
          />
          <TextInput
            id="eventDesc"
            onChange={this.onChange}
            label="Event Description"
            value={this.state.eventDesc}
          />
          <Select
            id="eventType"
            onChange={this.onChange}
            label="Event Type"
            value={this.state.eventType}
          >
            <option value="Seminar">Seminar</option>
            <option value="Internship">Internship</option>
            <option value="Workshop">Workshop</option>
          </Select>
          <DatePicker
            id="eventDate"
            value={this.state.eventDate}
            onChange={this.onDateChange}
          />
          <Button className="blue" large waves="light" type="submit">
            Save Changes
          </Button>
          <br />
          <Link to="/dashboard/announcements">
            <Button large waves="light" type="cancel">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.userId,
    isAnnouncementsUpdated: state.events.isAnnouncementsUpdated
  };
};

const mapDispatchToProps = dispatch => ({
  createEvent: (data, userId) => dispatch(createEvent(data, userId)),
  updateEvent: (data, userId) => dispatch(updateEvent(data, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAnnouncement);
