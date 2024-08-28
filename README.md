# Project Overview

This project integrates a WordPress site with a Node.js backend and a Python-based data processing service. The setup involves fetching data from WordPress, processing it using Python, and serving the processed data through a Node.js API.

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ShaneKolkoto/harvest-backend
    cd harvest-backend
    ```

2. **Build and Run with Docker Compose**

    ```bash
    docker-compose up --build
    ```

3. **API Endpoints**

    - **Node.js API**: `http://localhost:3000/api/data`
    - **Python Service**: `http://python-service:5000/process`

## Configuration

- Ensure Docker and Docker Compose are installed.
- Update `docker-compose.yml` with your configurations if needed.

## Directory Structure

- `node-server/`: Contains the Node.js backend.
- `python-service/`: Contains the Python data processing service.
- `Dockerfile`: Creates the WordPress server.
- `docker-compose.yml`: Defines the multi-container setup.
