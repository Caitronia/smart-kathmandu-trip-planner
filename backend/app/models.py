from database import get_db_connection

class Attraction:
    @staticmethod
    def get_all(category=None, is_hidden_gem=None):
        """Get all attractions, optionally filtered"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM attractions WHERE 1=1"
        params = []
        
        if category:
            query += " AND category = ?"
            params.append(category)
        
        if is_hidden_gem is not None:
            query += " AND is_hidden_gem = ?"
            params.append(is_hidden_gem)
        
        cursor.execute(query, params)
        attractions = cursor.fetchall()
        conn.close()
        return attractions
    
    @staticmethod
    def get_by_id(attraction_id):
        """Get a single attraction by ID"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM attractions WHERE id = ?", (attraction_id,))
        attraction = cursor.fetchone()
        conn.close()
        return attraction

class Restaurant:
    @staticmethod
    def get_all(cuisine_type=None, price_range=None):
        """Get all restaurants, optionally filtered"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM restaurants WHERE 1=1"
        params = []
        
        if cuisine_type:
            query += " AND cuisine_type = ?"
            params.append(cuisine_type)
        
        if price_range:
            query += " AND price_range = ?"
            params.append(price_range)
        
        cursor.execute(query, params)
        restaurants = cursor.fetchall()
        conn.close()
        return restaurants
    
    @staticmethod
    def get_by_id(restaurant_id):
        """Get a single restaurant by ID"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurants WHERE id = ?", (restaurant_id,))
        restaurant = cursor.fetchone()
        conn.close()
        return restaurant

class Hotel:
    @staticmethod
    def get_all(area=None, price_range=None):
        """Get all hotels, optionally filtered"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM hotels WHERE 1=1"
        params = []
        
        if area:
            query += " AND area = ?"
            params.append(area)
        
        if price_range:
            query += " AND price_range = ?"
            params.append(price_range)
        
        cursor.execute(query, params)
        hotels = cursor.fetchall()
        conn.close()
        return hotels
    
    @staticmethod
    def get_by_id(hotel_id):
        """Get a single hotel by ID"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM hotels WHERE id = ?", (hotel_id,))
        hotel = cursor.fetchone()
        conn.close()
        return hotel