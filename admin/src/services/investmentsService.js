
const headers = [
  "User", "First Name", "Last Name", "Date", "Holding", "Value",
]

module.exports.getCsvFormatted = function(investments, companies) {

  const entries = new Map(companies.map(company => {
    const {id, name} = company
    return [id, name]
  }))

  const mapCompanies = Object.fromEntries(entries)

  const rowCsv = investments.map(investment => {
    const {userId, firstName, lastName, date, investmentTotal, holdings} = investment

    return holdings.map(holding => {
      const {id, investmentPercentage} = holding
      return [userId, firstName, lastName, date, mapCompanies[id], investmentTotal * investmentPercentage].join(",")
    })
  })

  const header = headers.join(",")
  return [header, ...rowCsv.flat()].join("\r\n")
}
