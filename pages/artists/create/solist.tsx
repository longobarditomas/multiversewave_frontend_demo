import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtistForm from "../../../components/artists/Form";

function SolistCreate() {

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} lg={4} className="create-ensemble-column">
          <h1 className="text-center">Create Solist</h1>
          <ArtistForm isEnsemble={0} />
        </Col>
      </Row>
    </Container>
  );
}

export default SolistCreate
