# File Verification on Blockchain

This project demonstrates a simple file verification system using the Ethereum blockchain. It allows users to upload a file's hash to a smart contract and later verify the file's integrity by checking if its hash exists on the blockchain.

## Features

*   **Decentralized Verification:** File hashes are stored on the blockchain, providing a tamper-proof record.
*   **Simple Backend:** A Node.js and Express server to interact with the smart contract.
*   **User-Friendly Frontend:** A React application for easy file upload and verification.
*   **Hardhat Environment:** A complete Hardhat setup for local development and testing.

## Getting Started

This guide will walk you through setting up and running the project on your local machine.

### Prerequisites

*   Node.js (v14 or later)
*   npm (v6 or later)

### Installation and Setup

1.  **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies**

    Install the dependencies for both the root project and the client application:

    ```bash
    # Install root dependencies
    npm install

    # Install client dependencies
    npm install --prefix client
    ```

3.  **Start the Local Blockchain**

    Open a new terminal and run the following command to start a local Hardhat blockchain node:

    ```bash
    npx hardhat node
    ```
    Keep this terminal running. It will output a list of accounts and their private keys, which can be used for testing.

4.  **Deploy the Smart Contract**

    Open a second terminal and deploy the `FileVerification` smart contract to the local node:

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```
    This script will deploy the contract and create a `.env` file in the root directory containing the contract's address and a private key for the backend server to use.

5.  **Start the Backend Server**

    Open a third terminal and start the backend server:

    ```bash
    node index.js
    ```
    The server will start on `http://localhost:4000`. Keep this terminal running.

6.  **Start the Frontend Application**

    Finally, open a fourth terminal to start the React frontend:

    ```bash
    npm start --prefix client
    ```
    This will open the application in your default browser at `http://localhost:3000`.

## Backend API

The backend server provides the following API endpoints for interacting with the smart contract.

*   `POST /upload`: Uploads a file's hash to the blockchain.
*   `POST /verify`: Verifies a file's hash against the blockchain record.

### Testing with `curl`

You can test the backend API using a tool like `curl`.

1.  **Create a test file:**

    ```bash
    echo "This is a test file." > test.txt
    ```

2.  **Upload the file:**

    ```bash
    curl -X POST -F "file=@test.txt" http://localhost:4000/upload
    ```

3.  **Verify the file:**

    ```bash
    curl -X POST -F "file=@test.txt" http://localhost:4000/verify
