import React from 'react';
import { Table } from 'react-materialize';
import { Select } from 'react-materialize';
import { connect } from "react-redux";
import { getAllUsers, fetchDepartments, fetchUserRoles, deleteUser } from "../../actions/actions";

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDept: "",
      filterProg: "",
      filterUser: ""
    }
  }
  componentDidMount() {
    this.props.getAllUsers();
    this.props.fetchUserRoles();
    this.props.fetchDepartments();
  }
  deleteUser = (userId) => () => {
    this.props.deleteUser(userId);
    setTimeout(() => {
      this.props.getAllUsers();
    }, 1500);
  }
  onFilterChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { userRoles } = this.props;
    let { studentUsers, departments } = this.props;
    studentUsers = this.state.filterUser ? studentUsers.filter(u => u.roleId === this.state.filterUser) : studentUsers;
    studentUsers = this.state.filterDept ? studentUsers.filter(u => u.deptId === this.state.filterDept) : studentUsers;
    const department = departments.find(dept => dept.deptId === this.props.user.deptId) ? departments.find(dept => dept.deptId === this.props.user.deptId)['deptName'] : "";
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <h3>Manage Users</h3>
            <Select
              s={3}
              value={this.state.filterUser}
              id="filterUser"
              onChange={this.onFilterChange}
            >
              <option value="">All users</option>
              {
                userRoles.filter(role => role.roleId !== "1").map((role) => {
                  return <option value={role.roleId} key={role.roleId}>{role.type}</option>;
                })
              }
            </Select>
            <Select
              s={3}
              value={this.state.filterDept}
              id="filterDept"
              onChange={this.onFilterChange}
            >
              <option value="">All departments</option>
              {
                departments.map((dept) => {
                  return <option value={dept.deptId} key={dept.deptId}>{dept.deptName}</option>;
                })
              }
            </Select>
            <div className="col s10">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    studentUsers.map((user, index) => {
                      const role = userRoles.filter(role => role.roleId === user.roleId).map(role => role.type)[0];
                      return (
                        <tr key={user.userId}>
                          <td>{index + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.emailId}</td>
                          <td>{department}</td>
                          <td>{user.progId}</td>
                          <td>{user.mobileNo}</td>
                          <td>{role}</td>
                          <td>
                            <div onClick={this.deleteUser(user.userId)}>Delete</div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ManageUsers.propTypes = {
};

const mapStateToProps = state => {
  return ({
    user: state.auth.user,
    userRoles: state.auth.userRoles,
    departments: state.auth.departments,
    studentUsers: state.auth.allUsers.filter(user => user.roleId !== "1")
  })
};


const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  deleteUser: (userId) => dispatch(deleteUser(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);