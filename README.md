# LocalBuzz

LocalBuzz is a platform that connects local customers with neighborhood shops. It provides separate interfaces for customers to browse and shop, and for shop owners to manage their products and orders.

## Tech Stack

*   **Frontend:** React (Vite), CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Tokens)

## Features

*   **User Roles:** Separate dashboards for Customers and Shopkeepers.
*   **Authentication:** Secure Login and Signup for both roles.
*   **Shop Management:** Shopkeepers can add, edit, and delete products.
*   **Shopping:** Customers can view local shops, browse products, and place orders.
*   **Order Management:** Track and view order status.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) installed
*   [MongoDB](https://www.mongodb.com/) installed or a MongoDB Atlas connection string

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/LocalBuzz.git
    cd LocalBuzz
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

You need to set up environment variables for the backend to work correctly.

1.  Create a `.env` file in the **`backend`** folder.

### Running the Application

1.  **Start the Backend Server:**

    Open a terminal in the `backend` folder and run:
    ```bash
    npm start
    ```
    The server should start on `http://localhost:5000`.

2.  **Start the Frontend:**

    Open a new terminal in the `frontend` folder and run:
    ```bash
    npm run dev
    ```
    Open the link shown (usually `http://localhost:5173`) in your browser.

## Project Structure

*   **backend/**: Contains the API, database models, and controllers.
*   **frontend/**: Contains the React application, pages, and components.
