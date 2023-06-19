const admin = (req, res)=> {
    res.render("admin")


}

const message = (req, res)=> {
    res.render("message")
}

module.exports = {
    admin,
    message,
}