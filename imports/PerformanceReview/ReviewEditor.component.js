import { Button, Col, Form, Row, ToggleButton, ToggleButtonGroup } from
    "react-bootstrap"
import { Meteor } from "meteor/meteor"
import { PerformanceReviews } from
    "/imports/PerformanceReview/PerformanceReview.model"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

const OneToFiveRating = ({ label, fieldName, onUpdateRating }) => {
  const [rating, setRating] = useState(3)

  const onChangeRating = (value) => {
    setRating(value)
    onUpdateRating(value)
  }

  return (
    <Row>
    <Form.Group>
      <Col xs={"auto"}>
        <Form.Label htmlFor={fieldName}>{label}</Form.Label>
      </Col>

      <Col xs={"auto"}>
        <ToggleButtonGroup id={fieldName}
                           type={"radio"}
                           value={rating}
                           onChange={onChangeRating}
                           name={`${fieldName}-rating`}
                            >

          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
    </Row>
    )
}

const ReviewEditorComponent = ({ reviewee, onSave }) => {
  if (reviewee === null || typeof reviewee._id !== "string") {
    return null
  }

  const [review, setReview] = useState({
    reviewee: reviewee._id,
    attendance: 3,
    collaboration: 3,
    efficiency: 3,
    vision: 3,
    needsImprovement: "",
    isDoingWell: "",
    isReviewClosed: false
    })

  useEffect(() => {
    const newReview = PerformanceReviews.findOne({ reviewee: reviewee._id })

    if (newReview) {
      console.log(newReview)
      setReview(newReview)
    }
  }, [reviewee])

  const { fullName } = reviewee

  const updateReviewValue = (propertyName) => (e) =>
    setReview({ ...review,
                    [propertyName]: e.target ? e.target.value : e
                    })

  const saveReview = (e) => {
    e.preventDefault()

    Meteor.call("reviews.save", review, (e) => {
      onSave()
      })
  }

  const ONE_TO_FIVE_SCALE_QUESTIONS = {
    "attendance": "Demonstrate consistent, reliable attendance?",
    "collaboration": "Collaborate / function as a team player?",
    "efficiency": "Work efficiently?",
    "vision": "Exhibit behaviors that align with the corporate vision?"
  }

  return (
    <Row><Col xs={6}>
      <Form onSubmit={saveReview}>
        On a scale of 1-5 (with 1 being "Very poor", and 5 being "Excellent"),
        how well does {fullName}:

        {Object.keys(ONE_TO_FIVE_SCALE_QUESTIONS).map((key) =>
          <OneToFiveRating fieldName={key}
                           label={ONE_TO_FIVE_SCALE_QUESTIONS[key]}
                           onUpdateRating={updateReviewValue(key)}
                           key={`rating-${key}`}
                            />
          )}

        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </Col></Row>
  )
}

ReviewEditorComponent.propTypes = {
  reviewee: PropTypes.object,
  onSave: PropTypes.func.isRequired
}

export default ReviewEditorComponent
