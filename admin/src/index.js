const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const cors = require("cors")
const investmentsService = require("./services/InvestmentsService")
const fetch = require("node-fetch")

const app = express()

app.use(cors())

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  const {id} = req.params
  const response = await fetch(`${config.investmentsServiceUrl}/investments/${id}`)
  const data = await response.json()
  res.send(data)
})

async function exportCsv(req, res) {
  await fetch(`${config.investmentsServiceUrl}/investments`)
  // requests can be refactor with promise.all to be async
  const investments = await (await fetch(`${config.investmentsServiceUrl}/investments`)).json()
  const companies = await (await fetch(`${config.companiesServiceUrl}/companies`)).json()
  const csvFormatted = investmentsService.getCsvFormatted(investments, companies)

  await fetch(`${config.investmentsServiceUrl}/investments/export`, {method: "POST", body: csvFormatted})

  res.send(csvFormatted)
}
app.get("/investments/export/csv", exportCsv)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

module.exports = {
  exportCsv
}