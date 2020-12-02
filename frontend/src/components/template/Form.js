import React, { useState, useReducer } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

const url = "http://localhost:3030/templates/";

const createTemplate = async (template) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(template),
    redirect: "follow",
  });
};

const updateTemplate = async (template, updateComponent) => {
  await fetch(url + template._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(template),
    redirect: "follow",
  });
  updateComponent();
};

const TemplateForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [template, setTemplate] = useState(
    props.editTemplate || {
      title: "",
      author: { _id: "5fc239bd81249d00176aa6d0", name: "ElPepe" },
      number: "",
    }
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTemplate({ ...template, [name]: value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    if (template.title) {
      if (template._id) {
        updateTemplate(template, props.updateComponent);
        setValidated(true);
      } else {
        createTemplate(template);
        setTemplate({
          title: "",
          author: { author_id: "5fc239bd81249d00176aa6d0", name: "ElPepe" },
          number: "",
        });
        setValidated(false);
      }
    }
  };

  return (
    <Container>
      <h1>Template Form</h1>
      <Form
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        noValidate
        validated={validated}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name="title"
              type="text"
              value={template.title}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={template.author.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="number">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              name="number"
              value={template.number}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Form.Group>
          <Form.Check
            inline
            type="radio"
            label="first radio"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
          />
          <Form.Check
            inline
            type="radio"
            label="second radio"
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
          />
          <Form.Check
            inline
            type="radio"
            label="third radio"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {props.editTemplate ? "Edit" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default TemplateForm;
