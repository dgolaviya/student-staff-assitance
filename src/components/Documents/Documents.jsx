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
  deleteUser,
  fetchDocuments
} from "../../actions/actions";

class Documents extends React.Component {
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
    this.props.fetchDocuments();
  }

  onFilterChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const userDictionary = {};
    this.props.users.map((v, i) => (userDictionary[v.userId] = { ...v }));
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s12">
              <h3>Documents</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Created By</th>
                    <th>Timestamp</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.length > 0 && this.props.documents.length > 0 ? this.props.documents.map((v, i) => (
                    <tr key={i}>
                      <td>{v.docTitle}</td>
                      <td>{v.docDesc}</td>
                      <td>{v.docType}</td>
                      <td>{userDictionary[v.createdBy].userName}</td>
                      <td>{v.timestamp.substr(0, 10)}</td>
                      <td>
                        <a
                          href={
                            "data:" + v.contentType + ";base64," + v.docFile
                          }
                          target="_blank"
                        >
                          FILE
                        </a>
                      </td>
                    </tr>
                  )) : null}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Documents.propTypes = {};

const mapStateToProps = state => {
  return {
    users: state.auth.allUsers,
    documents: state.documents.documents
  };
};

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers()),
  fetchDocuments: () => dispatch(fetchDocuments())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
