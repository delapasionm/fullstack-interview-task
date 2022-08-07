const investmentsService = require("../services/InvestmentsService")

describe.skip("Testing Investments Service", () => {

    it('getCsvFormatted', () => {

        const investments = [{
            "id": "1",
            "userId": "1",
            "firstName": "Billy",
            "lastName": "Bob",
            "investmentTotal": 1400,
            "date": "2020-01-01",
            "holdings": [
                {
                    "id": "2",
                    "investmentPercentage": 1
                }
            ]
        }]

        const companies = [{
            "id": "1",
            "name": "The Big Investment Company",
            "address": "14 Square Place",
            "postcode": "SW18UU",
            "frn": "234165"
        },
            {
                "id": "2",
                "name": "The Small Investment Company",
                "address": "12 Circle Square",
                "postcode": "SW18UD",
                "frn": "773388"
            },
            {
                "id": "3",
                "name": "Capital Investments",
                "address": "1 Capital Road",
                "postcode": "SW18UT",
                "frn": "078592"
            }]

        const csvFormatted = investmentsService.getCsvFormatted(investments, companies);
        expect(typeof csvFormatted).toBe("string")


    });


});

/* describe('UserService', function () {
    describe('GetAllUser', function () {
      it('should return list users', async function () {

        const s = await us.f1()
        expect(s).to.equal('ciao')
      });
    });
  }); */