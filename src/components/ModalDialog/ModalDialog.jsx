import React, { Component } from 'react';
import { Modal, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { resetAuthError } from '../../actions/actions'

import './styles.scss';


export class ModalDialog extends Component {
  postActions = () => {
    const { history, resetShowModal, resetError } = this.props;

    if (this.props.error) { resetShowModal(); resetError(); }
    else { history.push('/login'); }
  }
  render() {
    const { open, error } = this.props;
    return (
      <Modal open={open} options={{
        onCloseEnd: this.postActions
      }} >
        <div className="modal-row">
          <Icon className={classnames("", {
            'modal-error-icon': error,
            'modal-success-icon': !error
          })} medium>{error ? 'error' : 'check_circle'}</Icon>
          {error ? <div className="px-10">Opps!! Something went wrong</div> :
            <div className="px-13">User registerd successfully</div>}
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  resetError: () => dispatch(resetAuthError())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);