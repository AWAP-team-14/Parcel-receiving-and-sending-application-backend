const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../app");
const { deleteOne } = require("../models/Parcel");

describe("Login API", () => {
  before(async () => {
    await server.start();
  });

  after(async () => {
    await server.close();
  });

  it("should successfully log in with valid credentials", async function () {
    this.timeout(10000);
    const response = await chai
      .request("http://localhost:5000/login")
      .post("/")
      .send({
        username: "t2bhmd00@students.oamk.fi",
        password: "Aiub@13238731",
      });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("success").to.be.true;
    expect(response.body).to.have.property("token").to.be.a("string");
    expect(response.body).to.have.property("user").to.be.a("string");
    expect(response.body).to.have.property("mobile").to.be.a("string");
    expect(response.body).to.have.property("username").to.be.a("string");
  });
  it("should return an error with invalid credentials", async () => {
    const response = await chai
      .request("http://localhost:5000/login")
      .post("/")
      .send({
        username: "invalid@example.com",
        password: "invalid",
      });
    expect(response).to.have.status(500);
    expect(response.body).to.have.property("success").to.be.false;
    expect(response.body.errors)
      .to.have.property("common")
      .to.have.property("msg")
      .to.equal("Unknown error occured!");
  });
});
