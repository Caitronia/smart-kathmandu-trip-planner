from flask import Blueprint, request, jsonify
from .models import Attraction, Restaurant, Hotel
import json

api_bp = Blueprint('api', __name__)

@api_bp.route('/test', methods=['GET'])
def test():
    """Test endpoint to verify API is working"""
    return jsonify({'message': 'API is working!'}), 200

@api_bp.route('/attractions', methods=['GET'])
def get_attractions():
    """Get all attractions with optional filters"""
    category = request.args.get('category')
    is_hidden = request.args.get('is_hidden_gem')
    
    if is_hidden is not None:
        is_hidden = is_hidden.lower() == 'true'
    
    attractions = Attraction.get_all(
        category=category,
        is_hidden_gem=is_hidden
    )
    
    # Convert to list of dictionaries
    result = [dict(attr) for attr in attractions]
    return jsonify(result), 200

@api_bp.route('/attractions/<int:attraction_id>', methods=['GET'])
def get_attraction(attraction_id):
    """Get a single attraction by ID"""
    attraction = Attraction.get_by_id(attraction_id)
    if attraction:
        return jsonify(dict(attraction)), 200
    return jsonify({'error': 'Attraction not found'}), 404

@api_bp.route('/restaurants', methods=['GET'])
def get_restaurants():
    """Get all restaurants with optional filters"""
    cuisine = request.args.get('cuisine_type')
    price = request.args.get('price_range')
    
    restaurants = Restaurant.get_all(
        cuisine_type=cuisine,
        price_range=price
    )
    
    result = [dict(rest) for rest in restaurants]
    return jsonify(result), 200

@api_bp.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    """Get a single restaurant by ID"""
    restaurant = Restaurant.get_by_id(restaurant_id)
    if restaurant:
        return jsonify(dict(restaurant)), 200
    return jsonify({'error': 'Restaurant not found'}), 404

@api_bp.route('/hotels', methods=['GET'])
def get_hotels():
    """Get all hotels with optional filters"""
    area = request.args.get('area')
    price = request.args.get('price_range')
    
    hotels = Hotel.get_all(
        area=area,
        price_range=price
    )
    
    result = [dict(hotel) for hotel in hotels]
    return jsonify(result), 200

@api_bp.route('/hotels/<int:hotel_id>', methods=['GET'])
def get_hotel(hotel_id):
    """Get a single hotel by ID"""
    hotel = Hotel.get_by_id(hotel_id)
    if hotel:
        return jsonify(dict(hotel)), 200
    return jsonify({'error': 'Hotel not found'}), 404

# We'll add the itinerary generation endpoint tomorrow
@api_bp.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    """Generate a personalized itinerary (placeholder for Day 2)"""
    data = request.get_json()
    
    # For now, return a sample response
    sample_itinerary = {
        'id': 1,
        'total_days': data.get('days', 3),
        'daily_plans': [
            {
                'day': 1,
                'activities': [
                    {'name': 'Swayambhunath Stupa', 'time': '09:00 AM'},
                    {'name': 'Kathmandu Durbar Square', 'time': '11:30 AM'}
                ],
                'restaurants': ['Bhojan Griha'],
                'accommodation': 'Thamel',
                'budget': 2000
            }
        ],
        'message': 'This is a placeholder itinerary. Full implementation coming Day 2!'
    }
    
    return jsonify(sample_itinerary), 200
