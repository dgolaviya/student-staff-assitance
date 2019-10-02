import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EnrollCourse extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s10">
            <h3>Enroll Courses</h3>
          </div>
        </div>
      </div>
    );
  }
}

EnrollCourse.propTypes = {
};

const mapStateToProps = state => ({
});


const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(EnrollCourse);