import { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserContext from "../../context/User/UserContext";
import FormErrorMessages from "../../components/form/ErrorMessages";

const Signin = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    "email": [],
    "password": [],
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var body = {
      "email": email,
      "password": password,
    };

    if (userContext) {
      let response = await userContext.loginUser(body);
      if (response?.errors) setErrors(response.errors);
    } else {
      console.error('User context is not available');
    }
  };

  return (
    <Container>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          <h1 style={{textAlign: "center"}}>Sign In</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="name" placeholder="Enter your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={errors.email?.length > 0} />
              <FormErrorMessages errors={errors.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={errors.password?.length > 0} />
              <FormErrorMessages errors={errors.password} />
            </Form.Group>
            <div className="submit-btn-container">
              <Button variant="danger" type="submit">Sign In</Button>
            </div>
          </Form>
        </Col>
        <Col md="4"></Col>
      </Row>
    </Container>
  );
};

export default Signin;