import React from "react";
import { Table, Button } from "react-materialize";
import { Link } from "react-router-dom";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import {
  getAllUsers,
  fetchDepartments,
  fetchUserRoles,
  fetchPrograms,
  deleteUser
} from "../../actions/actions";

class StudentListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDept: "",
      filterProg: "",
      filterUser: "3"
    };
  }
  componentDidMount() {
    this.props.getAllUsers();
    this.props.fetchUserRoles();
    this.props.fetchDepartments();
    this.props.fetchPrograms();
  }

  onFilterChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { userRoles, allPrograms } = this.props;
    let progList = {};
    allPrograms.forEach(p => {
      progList = { ...progList, [p.progId]: p.progName };
    });
    let { studentUsers, departments } = this.props;
    studentUsers = this.state.filterUser
      ? studentUsers.filter(u => u.roleId === this.state.filterUser)
      : studentUsers;
    studentUsers = this.state.filterDept
      ? studentUsers.filter(u => u.deptId === this.state.filterDept)
      : studentUsers;
    studentUsers = this.state.filterProg
      ? studentUsers.filter(u => u.progId === this.state.filterProg)
      : studentUsers;
    const department = departments.find(
      dept => dept.deptId === this.props.user.deptId
    )
      ? departments.find(dept => dept.deptId === this.props.user.deptId)[
          "deptName"
        ]
      : "";
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s12">
              <h3>Student List</h3>
              <Select
                s={3}
                value={this.state.filterDept}
                id="filterDept"
                onChange={this.onFilterChange}
              >
                <option value="">All departments</option>
                {departments.map(dept => {
                  return (
                    <option value={dept.deptId} key={dept.deptId}>
                      {dept.deptName}
                    </option>
                  );
                })}
              </Select>
              <Select
                s={3}
                value={this.state.filterProg}
                id="filterProg"
                onChange={this.onFilterChange}
              >
                <option value="">All programs</option>
                {allPrograms.map(prog => {
                  return (
                    <option value={prog.progId} key={prog.progId}>
                      {prog.progName}
                    </option>
                  );
                })}
              </Select>
              <Table>
                <thead>
                  <tr>
                    <th>Sr. no.</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Program</th>
                    <th>Mobile</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {studentUsers.map((user, index) => {
                    const role = userRoles
                      .filter(role => role.roleId === user.roleId)
                      .map(role => role.type)[0];
                    return (
                      <tr key={user.userId}>
                        <td>{index + 1}</td>
                        <td>{user.userName}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.emailId}</td>
                        <td>{department}</td>
                        <td>{progList[user.progId]}</td>
                        <td>{user.mobileNo}</td>
                        <td>{role}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

StudentListView.propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userRoles: state.auth.userRoles,
    departments: state.auth.departments,
    allPrograms: state.auth.allPrograms,
    studentUsers: state.auth.allUsers.filter(user => user.roleId !== "1")
  };
};

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  fetchPrograms: () => dispatch(fetchPrograms()),
  deleteUser: userId => dispatch(deleteUser(userId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentListView);
