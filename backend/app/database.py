import sqlite3
import os
from datetime import datetime

DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'instance', 'trip_planner.db')

def get_db_connection():
    """Create and return a database connection"""
    # Ensure the instance directory exists
    os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
    
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_db():
    """Initialize the database with tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create attractions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS attractions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        address TEXT,
        latitude REAL,
        longitude REAL,
        visiting_hours TEXT,
        entry_fee REAL,
        is_hidden_gem BOOLEAN DEFAULT 0,
        rating REAL,
        image_url TEXT,
        estimated_visit_time INTEGER
    )
    ''')
    
    # Create restaurants table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cuisine_type TEXT NOT NULL,
        address TEXT,
        latitude REAL,
        longitude REAL,
        description TEXT,
        price_range TEXT,
        rating REAL,
        image_url TEXT,
        opening_hours TEXT
    )
    ''')
    
    # Create hotels table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        area TEXT NOT NULL,
        address TEXT,
        latitude REAL,
        longitude REAL,
        price_range TEXT,
        rating REAL,
        description TEXT,
        image_url TEXT
    )
    ''')
    
    # Create itineraries table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS itineraries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_days INTEGER,
        travel_pace TEXT,
        budget TEXT,
        food_preferences TEXT,
        traveler_count INTEGER
    )
    ''')
    
    # Create itinerary_days table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS itinerary_days (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        itinerary_id INTEGER,
        day_number INTEGER,
        date DATE,
        accommodation_area TEXT,
        hotel_id INTEGER,
        estimated_budget REAL,
        FOREIGN KEY (itinerary_id) REFERENCES itineraries(id),
        FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    )
    ''')
    
    # Create itinerary_activities table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS itinerary_activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_id INTEGER,
        attraction_id INTEGER,
        start_time TEXT,
        end_time TEXT,
        order_number INTEGER,
        notes TEXT,
        FOREIGN KEY (day_id) REFERENCES itinerary_days(id),
        FOREIGN KEY (attraction_id) REFERENCES attractions(id)
    )
    ''')
    
    # Create day_restaurants table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS day_restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_id INTEGER,
        restaurant_id INTEGER,
        meal_type TEXT,
        order_number INTEGER,
        FOREIGN KEY (day_id) REFERENCES itinerary_days(id),
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully!")

if __name__ == "__main__":
    init_db()