const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");
const User = require("../models/People");

chai.use(chaiHttp);

describe("Signup API", () => {
  // Before starting the test, start the server
  before(async () => {
    await server.start();
  });

  // After finishing the test, close the server
  after(async () => {
    await server.close();
  });

  it("should successfully sign up a new user", async () => {
    // Clean up any existing user with the test email or mobile number
    await User.deleteMany({
      $or: [{ email: "testuser@example.com" }, { mobile: "+358406389000" }],
    });

    const response = await chai
      .request("http://localhost:5000/signup")
      .post("/")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        mobile: "+358406389000",
        password: "Test@1234",
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property("success").to.be.true;
    expect(response.body)
      .to.have.property("message")
      .to.equal("User Created Successfully");

    // Clean up: Remove the test user after the test
    await User.deleteMany({
      $or: [{ email: "testuser@example.com" }, { mobile: "+358406389000" }],
    });
  });

  it("should return an error when email already exists", async () => {
    const response = await chai
      .request("http://localhost:5000/signup")
      .post("/")
      .send({
        name: "Test User",
        email: "t2bhmd00@students.oamk.fi",
        mobile: "+358406389000",
        password: "Test@1234",
      });

    expect(response).to.have.status(500);
    expect(response.body.errors)
      .to.have.property("email")
      .to.have.property("msg")
      .to.equal("Email already in use");
  });
  it("should return an error when mobile number already exists", async () => {
    const response = await chai
      .request("http://localhost:5000/signup")
      .post("/")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        mobile: "+358406389300",
        password: "Test@1234",
      });

    expect(response).to.have.status(500);
    expect(response.body.errors)
      .to.have.property("mobile")
      .to.have.property("msg")
      .to.equal("Mobile number already in use");
  });
});
