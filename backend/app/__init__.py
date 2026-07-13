from flask import Flask
from flask_cors import CORS
import os
from .database import init_db

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Configure app
    app.config['SECRET_KEY'] = 'dev-key-please-change-in-production'
    
    # Enable CORS
    CORS(app, origins=['http://localhost:3000'])  # React dev server
    
    # Initialize database
    init_db()
    
    # Register routes
    from . import routes
    app.register_blueprint(routes.api_bp, url_prefix='/api')
    
    return app