import requests
import json

BASE_URL = 'http://127.0.0.1:5000/api'

def test_endpoints():
    """Test all API endpoints"""
    
    print("Testing API Endpoints...")
    print("-" * 50)
    
    # Test 1: Test endpoint
    response = requests.get(f'{BASE_URL}/test')
    print("Status Code:", response.status_code)
    print("Response Text:", response.text)
    
    # Test 2: Get all attractions
    response = requests.get(f'{BASE_URL}/attractions')
    attractions = response.json()
    print(f"Total attractions: {len(attractions)}")
    
    # Test 3: Get hidden gems
    response = requests.get(f'{BASE_URL}/attractions?is_hidden_gem=true')
    hidden_gems = response.json()
    print(f"Hidden gems: {len(hidden_gems)}")
    
    # Test 4: Get restaurants
    response = requests.get(f'{BASE_URL}/restaurants')
    restaurants = response.json()
    print(f"Total restaurants: {len(restaurants)}")
    
    # Test 5: Get hotels
    response = requests.get(f'{BASE_URL}/hotels')
    hotels = response.json()
    print(f"Total hotels: {len(hotels)}")
    
    # Test 6: Get specific attraction
    if attractions:
        first_id = attractions[0]['id']
        response = requests.get(f'{BASE_URL}/attractions/{first_id}')
        attraction = response.json()
        print(f"First attraction: {attraction['name']}")
    
    # Test 7: Generate itinerary (placeholder)
    data = {
        'days': 3,
        'interests': ['history', 'culture'],
        'pace': 'balanced',
        'budget': 'medium',
        'food_preferences': ['nepali'],
        'travelers': 2
    }
    response = requests.post(f'{BASE_URL}/generate-itinerary', json=data)
    itinerary = response.json()
    print(f"Itinerary generated: {itinerary['message']}")
    
    print("-" * 50)
    print("All tests completed!")

if __name__ == "__main__":
    test_endpoints()