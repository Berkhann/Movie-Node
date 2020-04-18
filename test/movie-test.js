const  chai = require('chai');
const chaiHttp=require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);
let token,movieID;

describe('----Before Get All Movies Test----',()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({ username: 'user123' , password: '12345'})
        .end((err,res)=>{
            token = res.body.token;
            done();
        })
    });

    describe('----Get All Movies Test----',()=>{
        it('İt should get all movies.',(done)=>{
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })
    })


    describe('----Movie Ekleme Test----',()=>{
        it('İt should post a movie.',(done)=>{
            const movie ={
                title:'Udemy',
                director_id:'5e96be8de56a0021e8e24d41',
                category:'Komedi',
                country:'Türkiye',
                year: 1990,
                imdb_score: 9
            }
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieID = res.body._id;
                done();
            })
        })
    })

    describe('----Find Movie With ID---',()=>{
        it('İt should get a movie by the given ID.',(done)=>{
            chai.request(server)
                .get('/api/movies/'+movieID)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieID);
                    done();
                })
        })
    })

    describe('----Update Movie TEST----',()=>{
        it('İt should Update a movie.',(done)=>{
            const movie ={
                title:'UdemyUpdate',
                director_id:'5e96be8de56a0021e8e24d99',
                category:'Suç',
                country:'Almanya',
                year: 2000,
                imdb_score: 5
            };
            chai.request(server)
            .put('/api/movies/'+movieID)
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                
                done();
            })
        })
    })

    describe('----Delete Movie TEST----',()=>{
        it('İt should Delete a movie.',(done)=>{
            chai.request(server)
            .delete('/api/movies/'+movieID)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                
                done();
            })
        })
    })
    
});