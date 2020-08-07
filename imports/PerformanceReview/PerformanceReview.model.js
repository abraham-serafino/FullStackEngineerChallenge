import Joi from "@hapi/joi"
import { Meteor } from "meteor/meteor"
import { Mongo } from "meteor/mongo"
import validateOrThrow from "/imports/validateOrThrow"

// this creates the collection in the database
const PerformanceReviews = new Mongo.Collection("performanceReviews")
let revieweeSubscription = []

// only the results of "published" queries are available to the client
if (Meteor.isServer) {
  Meteor.publish("performanceReviews.findByReviewee", () =>
    PerformanceReviews.find()
    )
}

// client must subscribe in order to access queries
else if (Meteor.isClient) {
  revieweeSubscription = Meteor.subscribe("performanceReviews.findByReviewee")
}

const performanceReviewSchema = Joi.object({
  _id: Joi.string(), // optional
  reviewee: Joi.string().required(),
  attendance: Joi.number().integer().min(1).max(5),
  collaboration: Joi.number().integer().min(1).max(5),
  efficiency: Joi.number().integer().min(1).max(5),
  vision: Joi.number().integer().min(1).max(5),
  needsImprovement: Joi.string().allow(""),
  isDoingWell: Joi.string().allow(""),
  isReviewClosed: Joi.boolean().required()
})

// Meteor's "methods" are socket-enabled API request handlers
Meteor.methods({
  "reviews.save" (review) {
    validateOrThrow(review, performanceReviewSchema)

    PerformanceReviews.update(
      { _id: review._id || "" },
      review,
      { upsert: true }
    )
  }
})

export { PerformanceReviews, revieweeSubscription }
