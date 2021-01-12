const fs = require('fs')
const data = require("./data.json")
    //post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    let { avatar_url, name, birth, grau, aula, gender, services } = req.body

    birth = Date.parse(birth)

    data.instructors.push({
        avatar_url,
        name,
        birth,
        grau,
        aula,
        gender,
        services,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error!")

        return res.redirect("/instructors")
    })
}