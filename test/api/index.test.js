const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../../app')

chai.use(chaiHttp)

describe('Node server', () => {
    it('(GET /) anasayfyı döndürür', (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.status.should.be.equal(200);
                //res.should.have.property('status', 400);
                done()
            })
    })
})