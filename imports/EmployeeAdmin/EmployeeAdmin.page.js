import { Button, Col, Form, ListGroup } from "react-bootstrap"
import React, { Fragment, useEffect, useState } from "react"
import { Employees, employeeListSubscription } from
    "/imports/EmployeeAdmin/Employee.model"

const EditableEmployee = ({ username, fullName, isAdmin, saveEmployee }) => {
  const [employee, setEmployee] = useState({ username, fullName, isAdmin })

  const update = ({
    isStillEditable = true,
    username = employee.username,
    fullName = employee.fullName,
    isAdmin = employee.isAdmin
  }) => {
    if (isStillEditable) {
      setEmployee({username, fullName, isAdmin, isEditable: isStillEditable})
    }

    saveEmployee({ username, fullName, isAdmin, isEditable: isStillEditable })
  }

  const changeUsername = (e) => update({ username: e.target.value })
  const changeFullName = (e) => update({ fullName: e.target.value })
  const changeIsAdmin = (e) => update({ isAdmin: e.target.checked })

  const save = (e) => {
    e.preventDefault()
    const { fullName, username } = employee

    if (typeof fullName === "string" && typeof username === "string") {
      update({ isStillEditable: false })
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
                          value={fullName}
                          onChange={changeFullName}
                          />
          </Col>

          <Col xs={"auto"}>
            <Form.Label htmlFor="username" srOnly>Username</Form.Label>
            <Form.Control className="mb-2"
                          id="fullName"
                          placeholder="jdoe"
                          value={username}
                          onChange={changeUsername}
                          />
          </Col>

          <Col xs="auto">
            <Form.Check type="checkbox"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Administrator"
                        value={isAdmin}
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

const Employee = ({ fullName, username, isAdmin }) => (
  <ListGroup.Item>
    {fullName} / {username} {isAdmin ? "(admin)" : ""}
  </ListGroup.Item>
)

const EmployeeList = ({ employeeList, updateEmployeeAt }) =>
  <ListGroup>
    {employeeList.map((employee, i) =>
      employee.isEditable ?
        <EditableEmployee fullName={employee.fullName}
                          username={employee.username}
                          saveEmployee={
                            (employee) => updateEmployeeAt(i, employee)
                            }
                          id={employee.id}
                          key={i}
                          /> :

        <Employee fullName={employee.fullName}
                  username={employee.username}
                  isAdmin={employee.isAdmin}
                  id={employee.id}
                  key={i}
                  />
      )}
  </ListGroup>

const EmployeeAdminPage = () => {
  const [pageState, setPageState] = useState({})
  const { employeeList = [] } = pageState

  // update employee list each time it changes on the server
  // useEffect(() => {
  //
  //   // Meteor sets the "ready" flag when the results of a query change
  //   if (employeeListSubscription.ready()) {
  //     setPageState({ employeeList: Employees.find() })
  //   }
  // })

  const onClickAdd = () => {
    setPageState({
      employeeList: employeeList.concat({
        fullName: "",
        isEditable: true
      })
    })
  }

  const updateEmployeeAt = (index, employee) => {
    employeeList[index] = employee
    setPageState({ employeeList })
  }

  return (
    <Fragment>
      <EmployeeList employeeList={employeeList}
                    updateEmployeeAt={updateEmployeeAt}
                    />

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

export default EmployeeAdminPage
