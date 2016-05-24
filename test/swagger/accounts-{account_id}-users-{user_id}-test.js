'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:8000'); // supertest init;

chai.should();

require('dotenv').load();

describe('/accounts/{account_id}/users/{user_id}', function() {
  describe('delete', function() {
    it('should respond with 204 Successful, returns no...', function(done) {
      api.del('/0/accounts/{account_id PARAM GOES HERE}/users/{user_id PARAM GOES HERE}')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.API_KEY)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with default Unexpected Internal...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "UNEXPECTED_ERROR"
                },
                "message": {
                  "type": "string",
                  "example": "Internal Server error"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.del('/0/accounts/{account_id PARAM GOES HERE}/users/{user_id PARAM GOES HERE}')
      .set('Content-Type', 'application/json')
      .set('Authorization', process.env.API_KEY)
      .expect('DEFAULT RESPONSE CODE HERE')
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

});