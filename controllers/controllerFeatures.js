const { Features, Users } = require('../models')

class ControllerFeatures {
  static addForm(req, res) {
    Users.findAll()
      .then(dataUsers => {
        res.render('addFeature', { dataUsers })
      })
  }

  static add(req, res) {
    const id = req.body.userId
    const obj = {
      name: req.body.name,
      scope: req.body.scope,
      link_to_code: req.body.link_to_code,
      feature_code: null,
      is_reviewed: false,
      is_merged: false,
      userId: req.body.userId
    }
    Features.create(obj)
      .then(data => {
        res.redirect(`/features/list/${id}`)
      })
      .catch(error => {
        res.send(error)
      })
  }

  static list(req, res) {
    const userId = req.params.userId
    Users.findOne({ where: { id: userId } })
      .then(dataUsers => {
        Features.findAll({ where: { userId: userId, is_merged: false } })
          .then(result => {
            res.render('feature', { result, dataUsers })
          })
          .catch(error2 => {
            res.send(error2)
          })
      })
      .catch(error1 => {
        res.send(error1)
      })
  }

  static approve(req, res) {
    const id = Number(req.params.id)
    const is_reviewed = true
    const is_merged = true
    Features.findOne({ where: { id: id } })
      .then(result => {
        const obj = {
          name: result.name,
          scope: result.scope,
          link_to_code: result.link_to_code,
          feature_code: result.feature_code,
          is_reviewed: is_reviewed,
          is_merged: is_merged
        }
        return Features.update(obj, { where: { id: id } })
          .then(result2 => {
            res.redirect(`/features/list/${result.userId}`)
          })
          .catch(error2 => {
            res.send(error2)
          })
      })
      .catch(error1 => {
        res.send(error1)
      })
  }

  static reject(req, res) {
    let id = Number(req.params.id);
    let is_reviewed = true;
    Features.findOne({ where: { id } })
      .then(result => {
        const obj = {
          name: result.name,
          scope: result.scope,
          link_to_code: result.link_to_code,
          feature_code: result.feature_code,
          is_merged: result.is_merged
        }
        Features.update(obj, { where: { id } })
          .then(result2 => {
            res.redirect(`/features/list/${result.userId}`)
          }).catch(err => {
            res.send(err)
          })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static closed(req, res) {
    Features.findAll({
      where: {
        is_merged: true
      }
    })
      .then(data => {
        res.render('closedFeature', { data })
      }).catch(err => {
        res.send(err)
      })
  }
  static remove(req, res) {
    let id = Number(req.params.id);
    Features.destroy({ where: { id } })
      .then(result => {
        res.redirect('/features/closed')
      }).catch(err => {
        res.send(err)
      })
  }
}

module.exports = ControllerFeatures