import { Button, Col, Form, ListGroup } from "react-bootstrap"
import React, {useState} from "react"

const saveEmployee = (employee) => Meteor.call("employees.save", employee)

const EmployeeForm = ({ details }) => {
  const [employee, setEmployee] = useState(details)

  const update = ({ username = employee.username,
                    fullName = employee.fullName,
                    isAdmin = employee.isAdmin || false
                    }) => {

    setEmployee({ username, fullName, isAdmin })
  }

  const changeUsername = (e) => update({ username: e.target.value })
  const changeFullName = (e) => update({ fullName: e.target.value })
  const changeIsAdmin = (e) => update({ isAdmin: !! e.target.checked })

  const save = (e) => {
    e.preventDefault()
    const { fullName, username } = employee

    if (typeof fullName === "string" && typeof username === "string") {
      saveEmployee(employee)
    }
  }

  return (
      <ListGroup.Item>
        <Form onSubmit={save}>
          <Form.Row className={"align-items-center"}>
            <Col xs={"auto"}>
              <Form.Label htmlFor="fullName" srOnly>Name</Form.Label>
              <Form.Control className="mb-2"
                            id="fullName"
                            placeholder="Jane Doe"
                            value={employee.fullName}
                            onChange={changeFullName}
                            />
            </Col>

            <Col xs={"auto"}>
              <Form.Label htmlFor="username" srOnly>Username</Form.Label>
              <Form.Control className="mb-2"
                            id="fullName"
                            placeholder="jdoe"
                            value={employee.username}
                            onChange={changeUsername}
                            />
            </Col>

            <Col xs="auto">
              <Form.Check type="checkbox"
                          id="autoSizingCheck"
                          className="mb-2"
                          label="Administrator"
                          value={employee.isAdmin}
                          onChange={changeIsAdmin}
                          />
            </Col>

            <Col xs={"2"}>
              <Button type="submit" className="mb-2 saveButton">Save</Button>
            </Col>
          </Form.Row>
        </Form>

        <style jsx={"true"}>{`
          .saveButton {
            margin-left: 89px;
            }
        `}</style>
      </ListGroup.Item>
  )
}

export default EmployeeForm
