import React from 'react';
import { Table } from 'react-materialize';
import { connect } from "react-redux";
import { getAllUsers, fetchDepartments, fetchUserRoles, deleteUser } from "../../actions/actions";

class ManageUsers extends React.Component {
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
  render() {
    const { studentUsers, departments, userRoles } = this.props;
    const department = departments.find(dept => dept.deptId === this.props.user.deptId) ? departments.find(dept => dept.deptId === this.props.user.deptId)['deptName'] : "";
    return (
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