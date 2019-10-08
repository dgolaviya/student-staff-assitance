import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Select, Button } from 'react-materialize';

import { updateUser, fetchUserRoles, fetchUser, fetchDepartments, fetchProgramsbyDept } from "../../actions/actions";
import AvatarImageUpload from '../AvatarImageUpload';
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
    const { departments, programs } = this.props;
    const department = departments.find(dept => dept.deptId === this.props.user.deptId) ? departments.find(dept => dept.deptId === this.props.user.deptId)['deptId'] : "";
    const program = programs.find(prog => prog.progId === this.props.user.progId) ? programs.find(prog => prog.progId === this.props.user.progId)['progId'] : "";
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      emailId: this.state.emailId,
      mobileNo: this.state.mobileNo,
      deptId: department,
      progId: program,
      roleId: this.props.user.roleId
    }
    if(this.props.user.roleId === "1") {
      delete userData.deptId;
      delete userData.progId;
    }
    this.props.updateUser(this.props.user.userId, userData);
    setTimeout(() => {
      this.props.fetchUser(this.props.user.userId);
    }, 1500);
  }

  render() {
    const { departments, programs } = this.props;
    const department = departments.find(dept => dept.deptId === this.props.user.deptId) ? departments.find(dept => dept.deptId === this.props.user.deptId)['deptName'] : "";
    const program = programs.find(prog => prog.progId === this.props.user.progId) ? programs.find(prog => prog.progId === this.props.user.progId)['progName'] : "";
    return (
      <div className="edit-profile">
        <AvatarImageUpload />
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
          <TextInput disabled label="Department" value={department} />
          <TextInput disabled label="Program" value={program} />
          <Button
            className="blue"
            blue
            large
            waves="light"
            type="submit"
          >Save Changes</Button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return ({
    user: ownProps.location.user ? ownProps.location.user : state.auth.user,
    departments: state.auth.departments,
    programs: state.auth.programs,
    userRoles: state.auth.userRoles,
  });
}

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  updateUser: (userId, userData) => dispatch(updateUser(userId, userData)),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchProgramsbyDept: (deptId) => dispatch(fetchProgramsbyDept(deptId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);