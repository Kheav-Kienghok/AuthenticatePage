# AuthenticatePage - Docker Setup

This guide explains how to build and run the AuthenticatePage application using Docker. The project is containerized with separate services for the frontend and backend.

## Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) on your system.

## Build and Run the Application

### Clone the Repository
```bash
git clone https://github.com/Kheav-Kienghok/AuthenticatePage.git
cd AuthenticatePage
```

### Build the Docker Images
1. Build the frontend image:
    ```bash
    docker build -t authenticatepage-frontend ./frontend
    ```
2. Build the backend image:
    ```bash
    docker build -t authenticatepage-backend ./backend
    ```

### Run the Containers
1. Start the frontend container:
    ```bash
    docker run -d -p 3000:3000 authenticatepage-frontend
    ```
2. Start the backend container:
    ```bash
    docker run -d -p 8000:8000 authenticatepage-backend
    ```

### Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

## Using Docker Compose

To simplify the process, you can use Docker Compose to manage both services.

### Docker Compose Setup
1. Create a `docker-compose.yml` file in the root directory with the following content:

    ```yaml
    version: '3.8'

    services:
      backend:
        image: kienghok/backend_app:v1.1.0
        container_name: backend_app
        ports:
          - "8000:8000"
        environment:
          - DOMAIN_URL=http://localhost:3000
        restart: always

      frontend:
        image: kienghok/frontend_app:v1.1.0
        container_name: frontend_app
        ports:
          - "3000:3000"
        environment:
          - VITE_API_URL=http://localhost:8000
        restart: always
    ```

2. If the application is running on a server or a different machine, replace the `DOMAIN_URL` and `VITE_API_URL` environment variables with the appropriate URLs. For example:
    - Replace `http://localhost:3000` with the frontend's public URL.
    - Replace `http://localhost:8000` with the backend's public URL.

3. Start the services:
    ```bash
    docker-compose up -d
    ```

4. Stop the services:
    ```bash
    docker-compose down
    ```

### Access the Application
- Frontend: `http://localhost:3000` (or the configured frontend URL).
- Backend API: `http://localhost:8000` (or the configured backend URL).

## Notes on Docker Images

- The `frontend` and `backend` services in the `docker-compose.yml` file use prebuilt images from Docker Hub:
  - Frontend: `kienghok/frontend_app:v1.1.0`
  - Backend: `kienghok/backend_app:v1.1.0`

- If you want to configure, customize, or build your own images, replace these images with your own in the `docker-compose.yml` file. For example:
    ```yaml
    frontend:
      build:
        context: ./frontend
      ports:
        - "3000:3000"
      environment:
        - VITE_API_URL=http://localhost:8000
      restart: always

    backend:
      build:
        context: ./backend
      ports:
        - "8000:8000"
      environment:
        - DOMAIN_URL=http://localhost:3000
      restart: always
    ```

- To build your own images, follow the steps in the **Build the Docker Images** section above and ensure the `docker-compose.yml` file points to the correct build contexts.

- If you use your own images, make sure to push them to your Docker Hub or private registry if needed, and update the `image` field in the `docker-compose.yml` file accordingly.