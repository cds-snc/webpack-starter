const path = require('path')
const { getClientJs } = require('../../utils/index')
const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = app => {
  const name = 'personal'
  const route = routeUtils.getRouteByName(name)

  routeUtils.addViewPath(app, path.join(__dirname, './'))

  app
    .get(route.path, (req, res) => {
      res.render(name, {
        ...routeUtils.getViewData(req),
        jsPath: getClientJs(req, name),
      })
    })
    .post(route.path, [
      ...routeUtils.getDefaultMiddleware({ schema: Schema, name: name }),
    ])
}
