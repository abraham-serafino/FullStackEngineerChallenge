import { Meteor } from "meteor/meteor"

const validateOrThrow = (input, schema) => {
  const { error } = schema.validate(input, { abortEarly: false })

  if (error) {
    // meteor errors are returned to the client
    // first argument is to help the client interpret the error,
    // second argument is meant to be displayed to the user
    throw new Meteor.Error("validation-failed", error.message)
  }
}

export default validateOrThrow
