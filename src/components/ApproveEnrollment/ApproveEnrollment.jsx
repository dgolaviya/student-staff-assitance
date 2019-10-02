import React from 'react';
import { Table } from 'react-materialize';
import { connect } from "react-redux";

import { getToApproveCourses, getCourses, approveEnrollment, getAllUsers } from "../../actions/actions";


class ApproveEnrollment extends React.Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getToApproveCourses();
    this.props.getAllUsers();
  }
  approveEnrollment = (courseId) => () => {
    this.props.approveEnrollment(this.props.user.userId, courseId, this.props.enrolledCourseIdUserIdMapping[courseId]);
  }
  render() {
    const { toApproveCourses, enrolledCourseIdUserIdMapping, studentUsers } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>Sr. no.</th>
            <th>User</th>
            <th>Course name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            toApproveCourses.map((course, index) => {
              const userId = enrolledCourseIdUserIdMapping[course.courseId];
              const user = studentUsers.find((user) => user.userId === userId);
              const userEmail = user ? user.emailId : '';
              return (
                <tr key={course.courseId}>
                  <td>{index + 1}</td>
                  <td>{userEmail}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseDescription}</td>
                  <td><div onClick={this.approveEnrollment(course.courseId)}>Approve</div></td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}


ApproveEnrollment.propTypes = {
};

const mapStateToProps = state => {
  const courses = state.course.courses;
  const toApproveCourseIds = state.course.toApproveCourses.map(c => c.enrollCourseId.courseId);
  let enrolledCourseIdUserIdMapping = {};
  state.course.toApproveCourses.forEach(c => (enrolledCourseIdUserIdMapping = { ...enrolledCourseIdUserIdMapping, [c.enrollCourseId.courseId]: c.enrollCourseId.userId }));
  const toApproveCourses = courses.filter(c => toApproveCourseIds.includes(c.courseId));
  return ({
    user: state.auth.user,
    toApproveCourses: toApproveCourses,
    enrolledCourseIdUserIdMapping,
    studentUsers: state.auth.allUsers.filter(user => user.roleId === "3")
  })
};


const mapDispatchToProps = (dispatch) => ({
  getToApproveCourses: () => dispatch(getToApproveCourses()),
  getCourses: () => dispatch(getCourses()),
  getAllUsers: () => dispatch(getAllUsers()),
  approveEnrollment: (adminId, courseId, enrollUserId) => dispatch(approveEnrollment(adminId, courseId, enrollUserId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ApproveEnrollment);