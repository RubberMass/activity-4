const express = require('express')
const routes = express.Router()

const teachers = require('./teachers')

routes.get('/', function(req, res) {
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index")
})

routes.get('/instructors/create', function(req, res) {
    return res.render("instructors/create")
})

routes.post("/teachers", teachers.post)

routes.get('students', function(req, res) {
    return res.send("students")
})

module.exports = routes