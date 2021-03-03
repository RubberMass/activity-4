const { json } = require('express')
const fs = require('fs')
const data = require("./data.json")
const { age, date } = require('./utils')

//show
exports.show = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teachers) {
        return id == teachers.id
    })


    if (!foundTeachers) return res.send("teachers not found!")

    const teachers = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        services: foundTeachers.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at),
    }

    return res.render("teachers/show", { teachers })
}

//create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    let { avatar_url, name, birth, grau, aula, services } = req.body

    birth = Date.parse(birth)

    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        grau,
        aula,
        services,

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error!")

        return res.redirect("/teachers")
    })
}

//edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teachers) {
        return id == teachers.id
    })

    if (!foundTeachers) return res.send("teachers not found")

    const teachers = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
    }

    return res.render('teachers/edit', { teachers })
}

//put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function(teachers, foundIndex) {
        if (id == teachers.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeachers) return res.send("teachers not found")

    const teachers = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error!")

        return res.redirect(`/teachers/${id}`)
    })

}
