import Joi from "@hapi/joi"
import { Meteor } from "meteor/meteor"
import { Mongo } from "meteor/mongo"
import validateOrThrow from "/imports/validateOrThrow"

// this creates the collection in the database
const Employees = new Mongo.Collection("employee")
let employeeListSubscription = []

// only the results of "published" queries are available to the client
if (Meteor.isServer) {
  Meteor.publish("employees.list", () => Employees.find())
}

// client must subscribe in order to access queries
else if (Meteor.isClient) {
  employeeListSubscription = Meteor.subscribe("employees.list")
}

const employeeSchema = Joi.object({
  _id: Joi.string(), // optional
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  isAdmin: Joi.boolean().required()
})

// Meteor's "methods" are socket-enabled API request handlers
Meteor.methods({
  "employees.save" (employee) {
    validateOrThrow(employee, employeeSchema)

    Employees.update(
      { _id: employee._id || "" },
      employee,
      { upsert: true }
    )
  }
})

export { Employees, employeeListSubscription }
