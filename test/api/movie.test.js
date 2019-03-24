const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../../app')

chai.use(chaiHttp)

let token;
let movieId = "5c961512821bf60ccf2b95d4"

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'okan', password: '123123' })
            .end((err,res) => {
                token = res.body.token
                console.log(token)
                done()
            })
    })

    describe('/GET movies', () => {
        it('it sohuld GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res) => {
                    res.status.should.be.equal(200)
                    res.body.should.be.a('array')
                    done()
            })
        })
    })

    describe('/GET movie with id', () => {
        it('it sohuld GET a movie with id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.status.should.be.equal(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')
                    //res.body.should.have.property('wrong_property')
                    done()
            })
        })
    })

    describe('/POST movie with Movie object', () => {
        it('it should include a Movie object and return a Movie object', (done) => {

            const movie = {
                title: 'Test Movie',
                director_id: '5c9681d1952da22ef0f4cf50',
                category: 'History',
                country: 'Turkey',
                year: '2015',
                imdb_score: 8
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.status.should.be.equal(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')
                    //res.body.should.have.property('wrong_property')
                    done()
            })
        })
    })

    describe('/PUT movie with id', () => {
        it('Request should include a property of Movie and id, return a Movie object', (done) => {

            const movie = {
                title: 'Test Movie new value',
                /*director_id: '5c9681d1952da22ef0f4cf50',
                category: 'History',
                country: 'Turkey',
                year: '2015',
                imdb_score: 8*/
            }

            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.status.should.be.equal(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title').equal(movie.title)
                    res.body.should.have.property('director_id')//.equal(movie.director_id)
                    res.body.should.have.property('category')//.equal(movie.category)
                    res.body.should.have.property('country')//.equal(movie.category)
                    res.body.should.have.property('year')//.equal(movie.year)
                    res.body.should.have.property('imdb_score')//.equal(movie.imdb_score)
                    //res.body.should.have.property('wrong_property')
                    done()
            })
        })
    })

    describe('/DELETE movie with id', () => {
        it('it should DELETE a movie with id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.status.should.be.equal(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').equal(true)
                    //res.body.should.have.property('wrong_property')
                    done()
            })
        })
    })

})