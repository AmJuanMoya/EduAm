# Project README

## Introduction

Welcome to the project! This document provides essential information to get you started with setting up and running the project. This project consists of a frontend built with Astro located in the `/view` directory and a backend (details to be further defined) in the root directory.

## Project Structure

The project is organized as follows:

-   `/`: Contains the backend code and project-wide configuration.
    -   `controller/`: Likely contains backend control logic.
    -   `model/`: Likely contains backend data models.
    -   `server/`: Intended for server-side code (e.g., `server.js`).
    -   `package.json`: Defines backend dependencies and scripts.
-   `/view`: Contains the frontend Astro project.
    -   `src/`: Frontend source code.
    -   `public/`: Static assets for the frontend.
    -   `package.json`: Defines frontend dependencies and scripts.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: Required for both backend and frontend development. You can download it from [nodejs.org](https://nodejs.org/).
-   **Astro**: The frontend is built with Astro. If you don't have it installed globally, the project's local dependencies will include it. You can find more information at [astro.build](https://astro.build/).
-   **MySQL**: The project uses the `mysql2` package, indicating a MySQL database is likely used for the backend. Ensure you have a MySQL server installed and running.

## Installation

Follow these steps to install the project dependencies:

1.  **Install Root Dependencies:**
    Navigate to the project's root directory and run:
    ```bash
    npm install
    ```

2.  **Install Frontend Dependencies:**
    Change to the `/view` directory and install its dependencies:
    ```bash
    cd view
    npm install
    ```

## Running the Project

### Frontend (Astro)

To run the frontend development server:

1.  Navigate to the `/view` directory:
    ```bash
    cd view
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
    This will typically start the frontend on `http://localhost:4321`.

Other useful Astro commands (run from the `/view` directory):

-   `npm run build`: To build the frontend for production.
-   `npm run preview`: To preview the production build locally.

### Backend

The setup and startup process for the backend is currently not fully defined.
-   The `package.json` in the root directory might define a main entry point (e.g., `index.js`), but this file is currently missing.
-   `server/server.js` exists but is currently empty.
-   Developers may need to consult `controller/maincontrol.js` or coordinate with the team to understand how to start and run the backend components.

We encourage new developers to familiarize themselves with the backend codebase in `controller/` and `model/` and consult with the team for specific instructions on running the backend services.
