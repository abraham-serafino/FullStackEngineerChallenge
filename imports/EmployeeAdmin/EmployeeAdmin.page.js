import { Button, Col, Form, ListGroup } from "react-bootstrap"
import { Employees } from "/imports/EmployeeAdmin/Employee.model"
import EmployeeForm from "/imports/EmployeeAdmin/EmployeeForm.component"
import React, { Fragment, useEffect, useState } from "react"
import { useTracker } from "meteor/react-meteor-data"

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

      <style jsx={"true"}>{`
        .plus-button {
          font-weight: 850;
          font-size: 1.5rem;
          border-radius: 25px;
          margin-top: 7px;
          padding-top: inherit;
          padding-bottom: unset;
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
