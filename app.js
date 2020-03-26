const express = require('express')
const app = express()
const port = 3000
const routerUser = require('./routers/routerUser')
const routerFeature = require('./routers/routerFeature')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/features', routerFeature)
app.use('/users', routerUser)

app.listen(port, () => {
  console.log(`PORT: ${port} SUCCESSFULLY RUNNING !!`)
})