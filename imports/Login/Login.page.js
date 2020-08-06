import { Form, Button, Alert } from "react-bootstrap"
import { Meteor } from "meteor/meteor"
import React, { useState } from "react"

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
        loginFailed: false
    })

    const { username, password, loginFailed } = loginDetails

    const updateUsername = (e) => setLoginDetails({
        username: e.target.value,
        password,
        loginFailed: false
    })

    const updatePassword = (e) => setLoginDetails({
        username,
        password: e.target.value,
        loginFailed: false
    })

    const login = (e) => {
        e.preventDefault()

        Meteor.loginWithPassword(username, password, e => {
            if (e) {
                setLoginDetails({ username, password, loginFailed: true })
            }

            else {
                console.log(Meteor.user())
            }
        })
    }

    return (
        <Form onSubmit={login}>
            <Form.Group controlId="">
                <Form.Label htmlFor={"username"}>Username</Form.Label>
                <Form.Control id="username"
                              value={username}
                              placeholder="Enter email"
                              onChange={updateUsername}
                            />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor={"password"}>Password</Form.Label>
                <Form.Control type="password"
                              id="passsword"
                              value={password}
                              placeholder="Password"
                              onChange={updatePassword}
                            />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>

            {loginFailed ? (
                <Alert variant={"danger"}>
                    Invalid username / password
                </Alert>) :

                null
                }
        </Form>
    )
}

export default LoginPage
