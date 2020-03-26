const { Users } = require('../models')

class ControllerUsers {
  static list(req, res) {
    Users.findAll()
      .then(data => {
        res.render('list', { users: data })
      })
      .catch(error => {
        console.log(error)
        res.send(error)
      })
  }
}

module.exports = ControllerUsers