import { Button, Col, Form, Nav, Navbar, Row } from "react-bootstrap"
import React, { useState } from "react"
import LoginPage from "../Login/Login.page";

const MainLayout = ({ children }) => {
    const logout = () => Meteor.logout()

    return (
        <Row className={"d-flex justify-content-center"}>
            <Col xs={12} lg={5}>
                <Navbar bg="primary" variant="dark" sticky="top">
                    <Navbar.Brand href="#home">FSEC</Navbar.Brand>

                    {!! Meteor.user() ?
                    <Nav className={"ml-auto"}>
                        <Nav.Link className={"active"} href={"#"}>
                            {Meteor.user().username}
                        </Nav.Link>

                        <Button variant="outline-light" onClick={logout}>
                            Logout
                        </Button>
                    </Nav> : null}
                </Navbar>

                {Meteor.user() ? children: <LoginPage />}
            </Col>

            <style jsx={"true"}>{`
              .navbar {
                  top: 3px;
                  border-radius: 10px 10px 0px 0px;
                }
            `}</style>
        </Row>
    )
}

export default MainLayout
