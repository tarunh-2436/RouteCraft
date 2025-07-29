from flask import Flask, request, jsonify
from flask_cors import CORS
import openrouteservice
from openrouteservice.optimization import Job, Vehicle
import traceback

app = Flask(__name__)
CORS(app)
ORS_API_KEY = "5b3ce3597851110001cf62486bdea8c08f904bc1bf1b70ebe018faa4"
ors_client = openrouteservice.Client(key=ORS_API_KEY)

def calculate_actual_route(depot, delivery_points):
    try:
        # Print debug info
        print(f"Depot: {depot}")
        print(f"Number of delivery points: {len(delivery_points)}")
        print(f"Sample delivery point: {delivery_points[0] if delivery_points else 'None'}")
        
        if len(delivery_points) > 48:
            print(f"Limiting delivery points from {len(delivery_points)} to 48")
            delivery_points = delivery_points[:48]
        
        # Ensure depot is in [lat, lng] format
        depot_lat, depot_lng = depot[0], depot[1]
        print(f"Depot coordinates: {[depot_lat, depot_lng]}")
        
        # Create jobs (delivery points) using the Job class
        jobs = []
        for i, point in enumerate(delivery_points):
            lat, lng = point[0], point[1]
            jobs.append(Job(
                id=i + 1,
                location=[lng, lat]  # OpenRouteService expects [lng, lat]
            ))
        
        # Create vehicle with start/end at depot using the Vehicle class
        vehicle = Vehicle(
            id=1,
            start=[depot_lng, depot_lat],  # [lng, lat]
            end=[depot_lng, depot_lat]     # [lng, lat]
        )
        
        print("Sending optimization request to OpenRouteService...")
        optimization = ors_client.optimization(jobs=jobs, vehicles=[vehicle])
        
        if "routes" not in optimization or not optimization["routes"]:
            print("No optimized route found.")
            return None, None
        
        steps = optimization["routes"][0]["steps"]
        
        # Build ordered list of coordinates (depot + optimized delivery order)
        ordered_coords = []
        ordered_points = []
        
        # Extract the visit order
        visit_order = []
        has_start = False
        for step in steps:
            if step["type"] == "start":
                visit_order.append([depot_lat, depot_lng])
                has_start = True
            elif step["type"] == "job":
                job_id = step["id"] - 1
                visit_order.append([delivery_points[job_id][0], delivery_points[job_id][1]])
            elif step["type"] == "end":
                visit_order.append([depot_lat, depot_lng])
        
        # If we didn't get a start step for some reason, add depot at the beginning
        if not has_start:
            visit_order.insert(0, [depot_lat, depot_lng])
            
        print(f"Visit order (first 3 points): {visit_order[:3]}")
        
        # Now calculate the actual road-based paths between consecutive points
        detailed_route = []
        for i in range(len(visit_order) - 1):
            start = visit_order[i]
            end = visit_order[i + 1]
            
            # Get directions between consecutive points (swap lat/lng for ORS API)
            directions = ors_client.directions(
                coordinates=[[start[1], start[0]], [end[1], end[0]]],
                profile='driving-car',
                format='geojson'
            )
            
            # Extract the coordinates from the route
            if directions and 'features' in directions and len(directions['features']) > 0:
                route_coords = directions['features'][0]['geometry']['coordinates']
                # Convert from [lng, lat] to [lat, lng] for Leaflet
                route_coords = [[coord[1], coord[0]] for coord in route_coords]
                detailed_route.extend(route_coords)
        
        print(f"Detailed route (first 3 points): {detailed_route[:3]}")
        
        # Build the ordered stops information
        stop_counter = 1
        for step in steps:
            if step["type"] == "start":
                ordered_points.append({
                    "label": "Depot",
                    "lat": depot_lat,
                    "lng": depot_lng,
                    "sequence": 0  # Start with 0 for depot
                })
            elif step["type"] == "job":
                job_id = step["id"] - 1
                lat, lng = delivery_points[job_id]
                ordered_points.append({
                    "label": f"Stop {stop_counter}",
                    "lat": lat,
                    "lng": lng,
                    "sequence": stop_counter  # Assign sequence number
                })
                stop_counter += 1
            elif step["type"] == "end":
                ordered_points.append({
                    "label": "Depot",
                    "lat": depot_lat,
                    "lng": depot_lng,
                    "sequence": stop_counter  # End with final number for depot
                })
        
        return detailed_route, ordered_points
        
    except Exception as e:
        print(f"Error in route optimization: {e}")
        print(traceback.format_exc())
        return None, None

@app.route('/api/optimal-route', methods=['POST'])
def optimal_route():
    try:
        data = request.json
        print(f"Received request data: {data}")
        
        depot = data.get('depot')
        delivery_points = data.get('deliveryPoints')
        
        if not depot or not delivery_points:
            return jsonify({'error': 'Depot and delivery points are required'}), 400
        
        route_coords, ordered_points = calculate_actual_route(depot, delivery_points)
        
        if route_coords:
            return jsonify({
                'route': route_coords,
                'orderedStops': ordered_points
            })
        else:
            return jsonify({'error': 'Could not calculate the optimal route'}), 500
            
    except Exception as e:
        print(f"Error in /api/optimal-route: {e}")
        print(traceback.format_exc())
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)