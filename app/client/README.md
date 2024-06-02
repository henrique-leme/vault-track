# Vault Track Frontend

<p align="center">
  <img src="https://img.shields.io/static/v1?label=React&message=library&color=blue&style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=language&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Vite&message=build-tool&color=green&style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/static/v1?label=Relay&message=framework&color=red&style=for-the-badge&logo=relay"/>
  <img src="https://img.shields.io/static/v1?label=Storybook&message=UI%20component%20development&color=orange&style=for-the-badge&logo=storybook"/>
</p>

## Project Status: ⚠️ In Development

### Description

Vault Track is a frontend service built to provide a seamless and interactive user experience for managing and tracking financial transactions. It leverages modern web technologies like React, Vite, Relay, TailwindCSS, and Storybook for efficient development and performance.

### ⚙️ Features

- User Interface for Financial Transactions
- Integration with Backend Services via GraphQL and Relay
- Responsive Design
- Interactive Components with ShadcnUI
- Component-driven development with Storybook

### 📚 Documentation

For detailed documentation, refer to the [Frontend Documentation](#) (link will be added).

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

### 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/henrique-leme/vault-track.git
   ```

2. Navigate to the client project directory:

   ```sh
   cd vault-track/app/client
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

## ⚙️ How to Run

1. Start the development server:

   ```sh
   pnpm dev
   ```

2. Start Storybook:
   ```sh
   pnpm storybook
   ```

This will run the frontend server and Storybook on your local machine.

### 📦 Deployment

- Steps to the deployment will be included in the futere

### 🛠️ Built With

- [React](https://reactjs.org/) - The library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - The programming language
- [Vite](https://vitejs.dev/) - The build tool
- [Relay](https://relay.dev/) - The GraphQL framework
- [TailwindCSS](https://tailwindcss.com/) - The CSS framework
- [Storybook](https://storybook.js.org/) - The tool for UI component development
- [Vitest](https://vitest.dev/) - The tests

## ✒️ Authors

- **Henrique** - _Developer_ - [GitHub](https://github.com/henrique-leme)

See also the list of [contributors](https://github.com/henrique-leme/vault-track/contributors) who participated in this project.
