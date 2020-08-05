import { Button, Col, Form, ListGroup } from "react-bootstrap"
import { Employees, employeeListSubscription } from
    "/imports/EmployeeAdmin/Employee.model"
import React, { Fragment, useEffect, useState } from "react"
import { useTracker } from "meteor/react-meteor-data"

const saveEmployee = (employee) => Meteor.call("employees.save", employee)

const EmployeeForm = ({ details }) => {
  const [employee, setEmployee] = useState(details)

  const update = ({
    username = employee.username,
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

      <style jsx>{`
        .saveButton {
          margin-left: 89px;
          }
      `}</style>
    </ListGroup.Item>
    )
}

const Employee = ({ employee }) => (
  <ListGroup.Item>
    {employee.fullName} / {employee.username}
    {employee.isAdmin ? " (admin)" : ""}
  </ListGroup.Item>
)

const EmployeeList = ({ employeeList }) => {
  const [listItems, setListItems] = useState([])

  useEffect(() => setListItems(employeeList), [employeeList])

  const onClickAdd = () => {
    setListItems(listItems.concat({
      type: "editable",
      payload: {
        fullName: "",
        username: "",
        isAdmin: false
      }
    }))
  }

  return (
    <Fragment>
      <ListGroup>
        {listItems.map((item, i) =>
          item.type === "editable" ?
            <EmployeeForm details={item.payload} key={i} /> :
            <Employee employee={item} key={i} />
            )}
      </ListGroup>

      <div className={"text-right"}>
        <Button className={"ml-left plus-button"}
          onClick={onClickAdd}>
            +
        </Button>
      </div>

      <style jsx>{`
        .plus-button {
          font-weight: 850;
          font-size: 1.5rem;
          border-radius: 25px;
          margin-top: 7px;
          padding-top: inherit;
        }
      `}</style>
    </Fragment>
  )
}

const EmployeeAdminPage = () => {
  // useTracker is a Meteor HOC that enables clients to "track"
  // changes to server-side data in real time.
  const employeeList = useTracker(() => {
    Meteor.subscribe("employees.list")
    return Employees.find().fetch()
  })

  return <EmployeeList employeeList={employeeList} />
}

export default EmployeeAdminPage
