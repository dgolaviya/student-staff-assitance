import React from 'react';
import { Table, Button } from 'react-materialize';
import { Link } from "react-router-dom";
import { Select } from 'react-materialize';
import { connect } from "react-redux";
import { getAllUsers, fetchDepartments, fetchUserRoles, fetchPrograms, deleteUser } from "../../actions/actions";

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
    this.props.fetchPrograms();
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
    const { userRoles, allPrograms } = this.props;
    let progList = {};
    allPrograms.forEach(p => {
      progList = { ...progList, [p.progId]: p.progName }
    });
    const uniquePrograms = Object.values(progList).filter((v, i) => Object.values(progList).indexOf(v) === i);
    // allPrograms = allPrograms.filter(p => Object.values(progList).includesp.progName)
    let { studentUsers, departments } = this.props;
    if (this.props.location.filterUser) {
      studentUsers = this.props.location.filterUser ? studentUsers.filter(u => u.roleId === this.props.location.filterUser) : studentUsers;
    } else {
      studentUsers = this.state.filterUser ? studentUsers.filter(u => u.roleId === this.state.filterUser) : studentUsers;
    }
    studentUsers = this.state.filterDept ? studentUsers.filter(u => u.deptId === this.state.filterDept) : studentUsers;
    studentUsers = this.state.filterProg ? studentUsers.filter(u => progList[u.progId] === this.state.filterProg) : studentUsers;
    const department = departments.find(dept => dept.deptId === this.props.user.deptId) ? departments.find(dept => dept.deptId === this.props.user.deptId)['deptName'] : "";
    let deptList = {}
    departments.forEach(d => deptList = {...deptList, [d.deptId]: d.deptName});
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s12">
              <h3>Manage Users</h3>
              <div>
                <Link to="/dashboard/create-user">
                  <Button onClick={() => { }}>
                    Create
                </Button>
                </Link>
              </div>
              <Select
                s={3}
                value={this.state.filterUser}
                id="filterUser"
                onChange={this.onFilterChange}
                disabled={!!this.props.location.filterUser}
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
              <Select
                s={3}
                value={this.state.filterProg}
                id="filterProg"
                onChange={this.onFilterChange}
              >
                <option value="">All programs</option>
                {
                  uniquePrograms.map((prog) => {
                    return <option value={prog} key={prog}>{prog}</option>;
                  })
                }
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
                          <td>{deptList[user.deptId]}</td>
                          <td>{progList[user.progId]}</td>
                          <td>{user.mobileNo}</td>
                          <td>{role}</td>
                          <td>
                            <div><a href="javascript:;" onClick={this.deleteUser(user.userId)}>Delete</a></div>
                            <div>
                              <Link to={{ pathname: '/dashboard/edit-user', user }} >Edit</Link>
                            </div>
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
    allPrograms: state.auth.allPrograms,
    studentUsers: state.auth.allUsers.filter(user => user.roleId !== "1")
  })
};


const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  fetchPrograms: () => dispatch(fetchPrograms()),
  deleteUser: (userId) => dispatch(deleteUser(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);