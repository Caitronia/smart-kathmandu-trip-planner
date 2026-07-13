from database import get_db_connection
import sqlite3

def seed_attractions():
    """Insert sample attractions data"""
    attractions = [
        # Famous Attractions
        {
            'name': 'Swayambhunath Stupa (Monkey Temple)',
            'category': 'spiritual',
            'description': 'Ancient religious complex atop a hill with stunning valley views',
            'address': 'Swayambhu, Kathmandu',
            'latitude': 27.7146,
            'longitude': 85.2906,
            'visiting_hours': '6:00 AM - 7:00 PM',
            'entry_fee': 200,
            'is_hidden_gem': 0,
            'rating': 4.7,
            'image_url': 'https://example.com/swayambhunath.jpg',
            'estimated_visit_time': 90
        },
        {
            'name': 'Kathmandu Durbar Square',
            'category': 'history',
            'description': 'Historic palace complex with ancient temples and architecture',
            'address': 'Kathmandu, Nepal',
            'latitude': 27.7045,
            'longitude': 85.3073,
            'visiting_hours': '7:00 AM - 6:00 PM',
            'entry_fee': 1000,
            'is_hidden_gem': 0,
            'rating': 4.5,
            'image_url': 'https://example.com/durbar-square.jpg',
            'estimated_visit_time': 120
        },
        {
            'name': 'Patan Durbar Square',
            'category': 'architecture',
            'description': 'Beautiful square with Newari architecture and temples',
            'address': 'Patan, Lalitpur',
            'latitude': 27.6731,
            'longitude': 85.3250,
            'visiting_hours': '7:00 AM - 6:00 PM',
            'entry_fee': 1000,
            'is_hidden_gem': 0,
            'rating': 4.6,
            'image_url': 'https://example.com/patan-square.jpg',
            'estimated_visit_time': 120
        },
        {
            'name': 'Boudhanath Stupa',
            'category': 'spiritual',
            'description': 'One of the largest stupas in the world, center of Tibetan Buddhism',
            'address': 'Boudha, Kathmandu',
            'latitude': 27.7215,
            'longitude': 85.3617,
            'visiting_hours': '24 hours',
            'entry_fee': 400,
            'is_hidden_gem': 0,
            'rating': 4.8,
            'image_url': 'https://example.com/boudhanath.jpg',
            'estimated_visit_time': 90
        },
        {
            'name': 'Pashupatinath Temple',
            'category': 'spiritual',
            'description': 'Sacred Hindu temple complex on the banks of Bagmati River',
            'address': 'Pashupati, Kathmandu',
            'latitude': 27.7105,
            'longitude': 85.3482,
            'visiting_hours': '4:00 AM - 9:00 PM',
            'entry_fee': 1000,
            'is_hidden_gem': 0,
            'rating': 4.6,
            'image_url': 'https://example.com/pashupatinath.jpg',
            'estimated_visit_time': 120
        },
        
        # Hidden Gems
        {
            'name': 'Garden of Dreams',
            'category': 'photography',
            'description': 'Peaceful neo-classical garden with beautiful architecture and plants',
            'address': 'Thamel, Kathmandu',
            'latitude': 27.7133,
            'longitude': 85.3130,
            'visiting_hours': '9:00 AM - 8:00 PM',
            'entry_fee': 300,
            'is_hidden_gem': 1,
            'rating': 4.4,
            'image_url': 'https://example.com/garden-dreams.jpg',
            'estimated_visit_time': 60
        },
        {
            'name': 'Kopan Monastery',
            'category': 'spiritual',
            'description': 'Peaceful Tibetan Buddhist monastery with meditation courses',
            'address': 'Kopan, Kathmandu',
            'latitude': 27.7491,
            'longitude': 85.3649,
            'visiting_hours': '9:00 AM - 5:00 PM',
            'entry_fee': 0,
            'is_hidden_gem': 1,
            'rating': 4.5,
            'image_url': 'https://example.com/kopan.jpg',
            'estimated_visit_time': 120
        },
        {
            'name': 'Nagarkot View Tower',
            'category': 'nature',
            'description': 'Stunning sunrise and sunset views of Himalayan range',
            'address': 'Nagarkot, Bhaktapur',
            'latitude': 27.7167,
            'longitude': 85.5167,
            'visiting_hours': '24 hours',
            'entry_fee': 100,
            'is_hidden_gem': 1,
            'rating': 4.7,
            'image_url': 'https://example.com/nagarkot.jpg',
            'estimated_visit_time': 180
        },
        {
            'name': 'Changu Narayan Temple',
            'category': 'history',
            'description': 'Ancient Hindu temple with important stone inscriptions',
            'address': 'Changunarayan, Bhaktapur',
            'latitude': 27.7161,
            'longitude': 85.4281,
            'visiting_hours': '9:00 AM - 5:00 PM',
            'entry_fee': 500,
            'is_hidden_gem': 1,
            'rating': 4.3,
            'image_url': 'https://example.com/changu-narayan.jpg',
            'estimated_visit_time': 90
        }
    ]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    for attr in attractions:
        cursor.execute('''
        INSERT INTO attractions 
        (name, category, description, address, latitude, longitude, 
         visiting_hours, entry_fee, is_hidden_gem, rating, image_url, estimated_visit_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            attr['name'], attr['category'], attr['description'], attr['address'],
            attr['latitude'], attr['longitude'], attr['visiting_hours'],
            attr['entry_fee'], attr['is_hidden_gem'], attr['rating'],
            attr['image_url'], attr['estimated_visit_time']
        ))
    
    conn.commit()
    conn.close()
    print("✅ Attractions seeded successfully!")

def seed_restaurants():
    """Insert sample restaurants data"""
    restaurants = [
        {
            'name': 'Bhojan Griha',
            'cuisine_type': 'nepali',
            'address': 'Dilli Bazar, Kathmandu',
            'latitude': 27.7103,
            'longitude': 85.3221,
            'description': 'Traditional Nepali cuisine in a restored Rana-era building',
            'price_range': 'medium',
            'rating': 4.4,
            'image_url': 'https://example.com/bhojan-griha.jpg',
            'opening_hours': '11:00 AM - 10:00 PM'
        },
        {
            'name': 'Newari Kitchen',
            'cuisine_type': 'newari',
            'address': 'Patan, Lalitpur',
            'latitude': 27.6740,
            'longitude': 85.3251,
            'description': 'Authentic Newari food with traditional ambiance',
            'price_range': 'medium',
            'rating': 4.3,
            'image_url': 'https://example.com/newari-kitchen.jpg',
            'opening_hours': '10:00 AM - 9:00 PM'
        },
        {
            'name': 'Thamel House Restaurant',
            'cuisine_type': 'nepali',
            'address': 'Thamel, Kathmandu',
            'latitude': 27.7137,
            'longitude': 85.3108,
            'description': 'Famous for traditional Newari and Nepali dishes',
            'price_range': 'medium',
            'rating': 4.2,
            'image_url': 'https://example.com/thamel-house.jpg',
            'opening_hours': '10:00 AM - 11:00 PM'
        },
        {
            'name': 'Himalayan Java Coffee',
            'cuisine_type': 'cafe',
            'address': 'Lazimpat, Kathmandu',
            'latitude': 27.7177,
            'longitude': 85.3190,
            'description': 'Popular coffee chain with great views and snacks',
            'price_range': 'budget',
            'rating': 4.1,
            'image_url': 'https://example.com/himalayan-java.jpg',
            'opening_hours': '7:00 AM - 9:00 PM'
        }
    ]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    for rest in restaurants:
        cursor.execute('''
        INSERT INTO restaurants 
        (name, cuisine_type, address, latitude, longitude, description, 
         price_range, rating, image_url, opening_hours)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            rest['name'], rest['cuisine_type'], rest['address'],
            rest['latitude'], rest['longitude'], rest['description'],
            rest['price_range'], rest['rating'], rest['image_url'],
            rest['opening_hours']
        ))
    
    conn.commit()
    conn.close()
    print("✅ Restaurants seeded successfully!")

def seed_hotels():
    """Insert sample hotels data"""
    hotels = [
        {
            'name': 'Hotel Yak & Yeti',
            'area': 'thamel',
            'address': 'Durbar Marg, Kathmandu',
            'latitude': 27.7118,
            'longitude': 85.3199,
            'price_range': 'luxury',
            'rating': 4.5,
            'description': '5-star heritage hotel with excellent amenities',
            'image_url': 'https://example.com/yak-yeti.jpg'
        },
        {
            'name': 'Thamel Eco Resort',
            'area': 'thamel',
            'address': 'Thamel, Kathmandu',
            'latitude': 27.7131,
            'longitude': 85.3118,
            'price_range': 'medium',
            'rating': 4.0,
            'description': 'Eco-friendly hotel in the heart of Thamel',
            'image_url': 'https://example.com/thamel-eco.jpg'
        },
        {
            'name': 'Hotel Shanker',
            'area': 'lazimpat',
            'address': 'Lazimpat, Kathmandu',
            'latitude': 27.7184,
            'longitude': 85.3230,
            'price_range': 'luxury',
            'rating': 4.3,
            'description': 'Heritage hotel with beautiful gardens and pool',
            'image_url': 'https://example.com/hotel-shanker.jpg'
        },
        {
            'name': 'Kantipur Temple House',
            'area': 'thamel',
            'address': 'Thamel, Kathmandu',
            'latitude': 27.7152,
            'longitude': 85.3125,
            'price_range': 'medium',
            'rating': 4.2,
            'description': 'Boutique hotel with traditional architecture',
            'image_url': 'https://example.com/kantipur-temple.jpg'
        }
    ]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    for hotel in hotels:
        cursor.execute('''
        INSERT INTO hotels 
        (name, area, address, latitude, longitude, price_range, rating, description, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            hotel['name'], hotel['area'], hotel['address'],
            hotel['latitude'], hotel['longitude'], hotel['price_range'],
            hotel['rating'], hotel['description'], hotel['image_url']
        ))
    
    conn.commit()
    conn.close()
    print("✅ Hotels seeded successfully!")

if __name__ == "__main__":
    seed_attractions()
    seed_restaurants()
    seed_hotels()
    print("✅ All data seeded successfully!")