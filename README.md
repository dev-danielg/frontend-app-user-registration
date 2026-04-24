# User Registration Frontend

This repository contains the source code for a User Registration front-end application. It provides a simple web interface to perform CRUD (Create, Read, Update, Delete) operations on user data.

The application is built as a Progressive Web App (PWA), enabling offline access and the ability to be "installed" on a user's device.

## Features

*   **Create Users:** Add new users with a name and email address.
*   **List Users:** View all existing users retrieved from the backend.
*   **Edit Users:** Select a user to populate the form and update their information.
*   **Delete Users:** Remove users from the database.
*   **PWA Ready:** Implements a service worker to cache core application assets for offline availability.

## Backend Connection

This frontend application is designed to communicate with a backend service to manage user data.

*   **API Endpoint:** `https://backend-app-user-registration.onrender.com/api/users`

The application requires this endpoint to be active to fetch, create, update, and delete user records.

## Getting Started

To run this project locally, you will need a modern web browser. Serving the files with a local web server is recommended for the service worker to function correctly.

### Running Locally

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/dev-danielg/frontend-app-user-registration.git
    cd frontend-app-user-registration
    ```

2.  Serve the files using a simple local web server. For example, if you have Python 3 installed, you can run:
    ```sh
    python -m http.server
    ```

3.  Open your web browser and navigate to `http://localhost:8000` (or the address provided by your server).

You can also open the `index.html` file directly in your browser, but functionality related to the service worker may be limited.

## How It Works

The application is built with vanilla HTML, CSS, and JavaScript.

*   `index.html`: The main structure of the web page, including the user form and the list display area. It uses Bootstrap for styling.
*   `style.css`: Contains custom styles to supplement Bootstrap.
*   `app.js`: Handles all client-side logic:
    *   Fetching and displaying the list of users from the API.
    *   Handling form submissions for creating and updating users.
    *   Processing user edits and deletions.
    *   Displaying status messages to the user.
*   `service-worker.js`: Caches the core application files (`HTML`, `CSS`, `JS`, `icons`) to allow the app to load while offline.
*   `manifest.json`: Provides metadata for the Progressive Web App, such as the app's name, icons, and theme colors, enabling it to be added to a device's home screen.
