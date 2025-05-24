
# Airalo Automation - Web and API

This Project covers tests for both web and API.

## Pre-requisites
Ensure the following tools are installed on your system before proceeding:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

**Programming Language:** TypeScript

## Steps to Run Tests

1. **Install Dependencies**  
   Run the following command to install all project dependencies:  
   ```bash
   npm install
   ```

2. **Run UI Tests**  
   - To run UI tests in **headless mode**, use:  
     ```bash
     npm run e2e:ui
     ```
   - To run UI tests in **headed mode**, add the `--headed` flag:  
     ```bash
     npm run e2e:ui -- --headed
     ```

3. **Run API Tests**  
   Before running API tests, ensure you set the required environment variables:  
   - `airalo_token` **or**  
   - `client_id` and `client_secret`  

   Run the API tests using:  
   ```bash
   npm run e2e:api
   ```

## Project Structure

```
airalo-automation/
│
├── tests/
│   ├── data/                 # Folder for data files
│   ├── airaloAPITest.spec.ts # API test file
│   └── airaloUiTest.spec.ts  # UI test file
│
├── package.json              # Project config and dependencies
└── playwright.config.ts      # Playwright configuration file
```

## Data Parameterization

This project supports data-driven testing. Modify the `data.json` file under the `tests/data/` folder to add new data sets:

- **UI Tests:**  
  Update the `datapacks` section in the `./data/data.json` file. The UI tests will execute for all data sets specified.

- **API Tests:**  
  Update the `simorders` section in the `./data/data.json` file. The API tests will execute for all data sets specified.

