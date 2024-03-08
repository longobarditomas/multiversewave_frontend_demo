import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserContext from "../../context/User/UserContext";
import FormErrorMessages from "../../components/form/ErrorMessages";

const Signup = () => {
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({
    "email": [],
    "name": [],
    "password": [],
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var body =  {
      "name": name,
      "username": email,
      "email": email,
      "password": password,
      "password_confirmation": passwordConfirmation
    };

    if (userContext) {
      let response = await userContext.registerUser(body);
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
        <h1 style={{textAlign: "center"}}>Sign Up</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={errors.email?.length > 0} />
              <FormErrorMessages errors={errors.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} isInvalid={errors.name?.length > 0} />
              <FormErrorMessages errors={errors.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={errors.password?.length > 0} />
              <FormErrorMessages errors={errors.password} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" placeholder="Confirm your Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
            <div className="submit-btn-container">
              <Button variant="danger" type="submit">Sign Up</Button>
            </div>
          </Form>
        </Col>
        <Col md="4"></Col>
      </Row>
    </Container>
  );
};

export default Signup;