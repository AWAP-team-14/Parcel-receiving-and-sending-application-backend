# How to install and use the application
1. Clone the repository.
2. Run the command "npm install" on the terminal.
3. Create a .env file on the project directory and paste the following code:
	MONGO_CONNECTION_STRING=mongodb://goparceltest:5IHQMw2XAOwryA9rloTN2F6EPz9Fx4FRxmwzyChnKd9y2JUu0xA0RTZFOWt6SlrEdhUOj1EqKf6CACDbxXWNSg==@goparceltest.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@goparceltest@
COOKIE_SECRET=08ae7b38278ed4ec0286e6b21be9cfb9d85e0b69
JWT_SECRET=08ae7b38b78ed4ec0256e6b21he9cfb9d85o0b69
JWT_EXPIRY=86400000
COOKIE_NAME=parcelApp

5. Run the repository using the command “npm start”.

### You can test the repository running the command "npx mocha".
