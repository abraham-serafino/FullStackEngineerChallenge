import { Meteor } from "meteor/meteor"
import "/imports/EmployeeAdmin/Employee.model"
import "/imports/PerformanceReview/PerformanceReview.model"

Meteor.startup(() => {
    if (!Accounts.findUserByUsername("admin")) {
        Accounts.createUser({
            username: "admin",
            password: "password"
        })
    }
})
