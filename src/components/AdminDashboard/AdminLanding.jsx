import React from 'react';
import { Card, Row, Col, Icon } from 'react-materialize';

const AdminLanding = (props) => {
  return (
    <>
      <Row style={{ padding: '0 25px' }}>
        <Col m={3} s={6}>
          <Card className="blue item-card lighten-2" onClick={() => props.history.push('/dashboard/approve-enrollment')}>
            <Icon large>check</Icon>
            {/* <div className="card-header">10</div> */}
            <div>Approve enrollment</div>
          </Card>
          <Card className="blue item-card lighten-2" onClick={() => props.history.push('/dashboard/manage-users')}>
            <Icon large>check</Icon>
            {/* <div className="card-header">10</div> */}
            <div>User accounts</div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminLanding;