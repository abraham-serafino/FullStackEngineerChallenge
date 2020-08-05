import { Button, Col, Form, Nav, Navbar, Row } from "react-bootstrap"
import React from "react"
import RoutesComponent from "./Routes.component"

const HomePage = () => (
  <Row className={"d-flex justify-content-center"}>
    <Col xs={12} lg={5}>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Navbar.Brand href="#home">FSEC</Navbar.Brand>

        <Nav className={"ml-auto"}>
          <Nav.Link className={"active"} href={"#"}>Admin User</Nav.Link>
          <Button variant="outline-light">Logout</Button>
        </Nav>
      </Navbar>

      <RoutesComponent />
    </Col>

    <style jsx>{`
      .navbar {
          top: 3px;
          border-radius: 10px 10px 0px 0px;
        }
    `}</style>
  </Row>
)

export default HomePage
