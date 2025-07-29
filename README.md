## RouteCraft - Delivery Route Optimization System
RouteCraft is a web-based logistics application designed to solve the Travelling Salesman Problem (TSP) for delivery fleets. It empowers users to find the most efficient route for a vehicle making 20-50 stops, starting from a depot and returning to it. By optimizing routes, RouteCraft aims to significantly reduce fuel costs, save time, and increase overall operational efficiency.

### ✨ Key Features
**Dynamic Route Optimization:** Solves the complex Travelling Salesman Problem to compute the shortest possible route for multi-stop deliveries.

**Interactive Map Interface:** Users can easily add a depot and multiple delivery points by simply clicking on a live, interactive map powered by Leaflet.js.

**Real-World Routing Data:** Integrates with the OpenRouteService (ORS) API to calculate distance matrices and generate routes based on actual road networks.

**Clear Route Visualization:** The final optimized route is drawn on the map, providing a clear visual representation of the path.

**Detailed Route Summary:** Displays a step-by-step summary of the route, including the coordinates for the depot and each stop in the optimal sequence.

**Secure User Authentication:** Features a complete user registration and login system managed by Supabase.

### 🛠️ Tech Stack
**Frontend**
React.js: A JavaScript library for building a fast, responsive, and component-based user interface.

Leaflet.js: A lightweight, open-source library for interactive maps.

react-leaflet: React components for Leaflet maps.

CSS3: For styling the user interface.

**Backend**
Python: The core language for the application's logic.

Flask: A lightweight WSGI web application framework used to build the RESTful API.

Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS).

**Databases & Services**
OpenRouteService (ORS): Used for its powerful Optimization, Geocoding, and Matrix APIs to get real-world routing data.

Supabase: An open-source Firebase alternative for the PostgreSQL database, user authentication, and instant APIs.

### 🚀 Getting Started
To get a local copy up and running, follow these simple steps.

**Prerequisites**
Node.js and npm installed

Python 3.x and pip installed

An API key from OpenRouteService

A Supabase project set up with the URL and anon key.

**Installation & Setup**
1. Clone the repository:

git clone https://github.com/your-username/routecraft.git
cd routecraft

2. Backend Setup (Flask):

```
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install the required packages
pip install -r requirements.txt

# Create a .env file and add your API keys
echo "ORS_API_KEY='your_openrouteservice_api_key'" > .env
echo "SUPABASE_URL='your_supabase_project_url'" >> .env
echo "SUPABASE_KEY='your_supabase_anon_key'" >> .env

# Run the Flask server
flask run

The backend will be running on http://127.0.0.1:5000.

3. Frontend Setup (React):

# Navigate to the frontend directory
cd ../frontend

# Install NPM packages
npm install

# Start the React development server
npm start

The frontend will be accessible at http://localhost:3000.
```

### Project Link: https://github.com/tarunh-2436/RouteCraft
