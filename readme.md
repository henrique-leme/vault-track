# Vault Track

<p align="center">
  <img src="https://img.shields.io/static/v1?label=React&message=library&color=blue&style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=language&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Vite&message=build-tool&color=green&style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/static/v1?label=Relay&message=framework&color=red&style=for-the-badge&logo=relay"/>
  <img src="https://img.shields.io/static/v1?label=Storybook&message=UI%20component%20development&color=orange&style=for-the-badge&logo=storybook"/>
  <img src="https://img.shields.io/static/v1?label=Node.js&message=runtime&color=green&style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/static/v1?label=Koa&message=framework&color=yellow&style=for-the-badge&logo=koa"/>
  <img src="https://img.shields.io/static/v1?label=GraphQL&message=query%20language&color=orange&style=for-the-badge&logo=graphql"/>
  <img src="https://img.shields.io/static/v1?label=Jest&message=test%20framework&color=brightgreen&style=for-the-badge&logo=jest"/>

</p>

## Project Status: ⚠️ In Development

### Description

Vault Track is a comprehensive service built to manage and track financial transactions securely and efficiently. The frontend provides a seamless and interactive user experience, while the backend ensures secure and high-performance data management. It leverages modern web technologies such as React, Vite, Relay, TailwindCSS, Storybook, Node.js, Koa, GraphQL, and MongoDB.

### ⚙️ Features

- **Frontend:**

  - User Interface for Financial Transactions
  - Integration with Backend Services via GraphQL and Relay
  - Responsive Design
  - Interactive Components with ShadcnUI
  - Component-driven development with Storybook

- **Backend:**
  - User Authentication and Authorization
  - Transaction Management
  - Secure Storage with MongoDB
  - GraphQL API

### 📚 Documentation

For detailed documentation, refer to the [Documentation](#) (link will be added).

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

2. Navigate to the client project directory:

   ```sh
   cd vault-track/
   ```

3. Copy the environment configuration file in:
   the server and client folder inside app

   ```sh
   cp .env.example .env

   #Note: This command will not work in WindowsOS, for windows you have to
   #manually copy and paste the .env.exemmple and rename it for .env
   ```

4. Install dependencies:
   ```sh
   pnpm install
   ```

## ⚙️ How to Run

1. Start the development server:

   ```sh
   pnpm dev
   ```

### 📦 Deployment

- Steps to the deployment will be included in the futere

### 🛠️ Built With

- Client:

  - [React](https://reactjs.org/) - The library for building user interfaces
  - [TypeScript](https://www.typescriptlang.org/) - The programming language
  - [Vite](https://vitejs.dev/) - The build tool
  - [Relay](https://relay.dev/) - The GraphQL framework
  - [TailwindCSS](https://tailwindcss.com/) - The CSS framework
  - [Storybook](https://storybook.js.org/) - The tool for UI component
    development
  - [Vitest](https://vitest.dev/) - The tests

- Server:
  - [Node.js](https://nodejs.org/) - The runtime environment
  - [Koa](https://koajs.com/) - The web framework
  - [TypeScript](https://www.typescriptlang.org/) - The programming language
  - [GraphQL](https://graphql.org/) - The query language
  - [MongoDB](https://www.mongodb.com/) - The database
  - [Jest](https://jestjs.io/) - The tests

## ✒️ Authors

- **Henrique** - _Developer_ - [GitHub](https://github.com/henrique-leme)

See also the list of [contributors](https://github.com/henrique-leme/vault-track/contributors) who participated in this project.
