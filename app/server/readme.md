# Vault Track Backend

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=runtime&color=green&style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=language&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Koa&message=framework&color=yellow&style=for-the-badge&logo=koa"/>
  <img src="https://img.shields.io/static/v1?label=GraphQL&message=query%20language&color=orange&style=for-the-badge&logo=graphql"/>
  <img src="https://img.shields.io/static/v1?label=Jest&message=test%20framework&color=brightgreen&style=for-the-badge&logo=jest"/>

</p>

## Project Status: ⚠️ In Development

### Description

Vault Track is a backend service built to manage and track financial transactions securely. It utilizes modern web technologies such as Node.js, Koa, GraphQL and MongoDB, ensuring high performance and scalability.

### ⚙️ Features

- User Authentication and Authorization
- Transaction Management
- Secure Storage with MongoDB
- GraphQL API

### 📚 Documentation

For detailed API documentation, refer to the [API Documentation](#) (link will be added).

To access the documentation locally:

1. Clone the project.
2. Follow the setup instructions below.

### 📝 Table of Contents

- [Getting Started](#getting-started)
- [How to Run](#how-to-run)
- [Development](#development)
- [Authors](#authors)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- pnpm
- Docker

### 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/henrique-leme/vault-track.git
   ```

2. Navigate to the server project directory:

   ```sh
   cd vault-track/app/server
   ```

3. Copy the environment configuration file:

   ```sh
   cp .env.example .env

   #Note: This command will not work in WindowsOS, for windows you have to
   #manually copy and paste the .env.exemmple and rename it for .env
   ```

4. Install dependencies:
   ```sh
   pnpm install
   ```

### 🔌 Starting/Configuring the Database

1. Start the Docker containers:
   ```sh
   pnpm compose:up
   ```

## ⚙️ How to Run

1. Start the development server:
   ```sh
   pnpm dev
   ```

This will run **only** the backend server on your local machine.

### 🛠 Running Tests

1. Run unit tests:
   ```sh
   pnpm test
   ```

## 📦 Deployment

- Steps to the deployment will be included in the futere

### 🛠️ Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- [TypeScript](https://www.typescriptlang.org/) - The programming language
- [Koa](https://koajs.com/) - The web framework
- [GraphQL](https://graphql.org/) - The query language
- [MongoDB](https://www.mongodb.com/) - The database
- [Jest](https://jestjs.io/) - The tests

## ✒️ Authors

- **Henry** - _Developer_ - [GitHub](https://github.com/henrique-leme)

See also the list of [contributors](https://github.com/henrique-leme/vault-track/contributors) who participated in this project.
