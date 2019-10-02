import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Select, Button } from 'react-materialize';

import { updateUser, fetchUserRoles, fetchDepartments, fetchProgramsbyDept } from "../../actions/actions";
import './styles.scss';
class EditProfile extends Component {
  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    userName: this.props.user.userName,
    emailId: this.props.user.emailId,
    mobileNo: this.props.user.mobileNo,
    userType: '',
    errors: {},
    hideDeptProg: false,
    showModal: false
  }
  componentDidMount() {
    this.props.fetchDepartments();
    this.props.fetchProgramsbyDept(this.props.user.deptId);
    this.props.fetchUserRoles();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        ...this.props.user
      });
    }
    if (prevProps.userRoles !== this.props.userRoles) {
      this.setState({
        userType: this.props.userRoles.find(item => item.roleId === this.props.user.roleId)['type']
      });
    }
  }
  fetchProgramsbyDept(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.props.fetchProgramsbyDept(e.target.value);
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      if (this.state.userType === '2') {
        this.setState({ hideDeptProg: true });
      }
      else {
        this.setState({ hideDeptProg: false });
      }
    });
  };
  updateUserInfo = (e) => {
    e.preventDefault();
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      emailId: this.state.emailId,
      mobileNo: this.state.mobileNo,
      deptId: e.target['dept'].value,
      progId: e.target['program'].value
    }
    this.props.updateUser(this.props.user.userId, userData);
  }

  render() {
    const { departments, programs } = this.props;
    return (
      <form onSubmit={this.updateUserInfo} className="edit-profile-form">
        <TextInput
          id="firstName"
          onChange={this.onChange}
          label="First Name"
          value={this.state.firstName}
        />
        <TextInput
          id="lastName"
          onChange={this.onChange}
          label="Last Name"
          value={this.state.lastName}
        />
        <TextInput
          id="userName"
          onChange={this.onChange}
          label="User Name"
          value={this.state.userName}
        />
        <TextInput
          id="emailId"
          onChange={this.onChange}
          label="Email Id"
          value={this.state.emailId}
        />
        <TextInput
          id="mobileNo"
          onChange={this.onChange}
          label="Mobile No"
          value={this.state.mobileNo}
        />
        <TextInput disabled label="User Type" value={this.state.userType} />
        <Select
          id="dept"
          onChange={(event) => this.fetchProgramsbyDept(event)}
        >
          {
            departments.map((dept) => {
              return <option value={dept.deptId} key={dept.deptId}>{dept.deptName}</option>
            })
          }
        </Select>
        <Select
          id="program"
          onChange={this.onChange}
        >
          {
            programs.map((prog) => {
              return <option value={prog.progId} key={prog.progId}>{prog.progName}</option>
            })
          }
        </Select>
        <Button
          className="blue"
          blue
          large
          waves="light"
          type="submit"
        >Save Changes</Button>
      </form>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  departments: state.auth.departments,
  programs: state.auth.programs,
  userRoles: state.auth.userRoles,
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  updateUser: (userId, userData) => dispatch(updateUser(userId, userData)),
  fetchProgramsbyDept: (deptId) => dispatch(fetchProgramsbyDept(deptId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);