"""
Configuración de la aplicación Flask para el formulario de clientes
"""

import os
from pathlib import Path

class Config:
    """Configuración base de la aplicación"""
    
    # Configuración básica de Flask
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Base de datos
    BASE_DIR = Path(__file__).parent
    DATABASE_PATH = BASE_DIR / 'database' / 'formulario_clientes.db'
    
    # Archivos subidos
    UPLOAD_FOLDER = BASE_DIR / 'static' / 'uploads'
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB máximo por archivo
    ALLOWED_EXTENSIONS = {'docx', 'pdf', 'jpg', 'jpeg', 'png', 'gif'}
    
    # Configuración de formulario
    STEPS_COUNT = 6
    STEP_NAMES = [
        'Datos de la Empresa',
        'Información de Trasteros', 
        'Usuarios de la Aplicación',
        'Configuración de Correo',
        'Niveles de Acceso',
        'Documentación'
    ]
    
    # Validaciones
    VALIDATION_RULES = {
        'nif': r'^[0-9]{8}[A-Z]$',
        'email': r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        'telefono': r'^(\+34|0034|34)?[6789][0-9]{8}$',
        'codigo_postal': r'^[0-9]{5}$',
        'iban': r'^ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}$'
    }
    
    # Configuración de logging
    LOG_LEVEL = 'INFO'
    LOG_FILE = BASE_DIR / 'logs' / 'app.log'

class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'production-secret-key-change-me')

class TestingConfig(Config):
    """Configuración para testing"""
    TESTING = True
    DATABASE_PATH = ':memory:'  # Base de datos en memoria para tests

# Configuración por defecto
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
