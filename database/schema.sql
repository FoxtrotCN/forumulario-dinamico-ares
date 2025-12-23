-- Esquema de Base de Datos para Formulario Dinámico de Clientes
-- SQLite Database Schema

-- Tabla principal de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_cliente VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly name
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    completado BOOLEAN DEFAULT FALSE
);

-- Tabla de formularios completados por cliente
CREATE TABLE IF NOT EXISTS formularios_clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    
    -- Paso 1: Datos de la empresa (JSON)
    datos_empresa TEXT,
    
    -- Paso 2: Información de trasteros (JSON)
    info_trasteros TEXT,
    
    -- Paso 3: Usuarios de la aplicación (JSON)
    usuarios_app TEXT,
    
    -- Paso 4: Configuración de correo (JSON)
    config_correo TEXT,
    
    -- Paso 5: Niveles de acceso (JSON)
    niveles_acceso TEXT,
    
    -- Paso 6: Documentación (JSON con rutas de archivos)
    documentacion TEXT,
    
    -- Control de progreso
    paso_actual INTEGER DEFAULT 1,
    porcentaje_completado INTEGER DEFAULT 0,
    
    -- Timestamps
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes (id) ON DELETE CASCADE
);

-- Tabla para archivos subidos
CREATE TABLE IF NOT EXISTS archivos_clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formulario_id INTEGER NOT NULL,
    nombre_original VARCHAR(255) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL, -- nombre único en el servidor
    tipo_archivo VARCHAR(50) NOT NULL, -- docx, pdf, jpg, png
    tamaño_bytes INTEGER NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    paso_formulario INTEGER NOT NULL, -- en qué paso se subió
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (formulario_id) REFERENCES formularios_clientes (id) ON DELETE CASCADE
);

-- Tabla de logs para auditoría
CREATE TABLE IF NOT EXISTS logs_formulario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    formulario_id INTEGER,
    accion VARCHAR(100) NOT NULL, -- 'creado', 'actualizado', 'completado', 'archivo_subido'
    paso INTEGER,
    detalles TEXT, -- JSON con detalles adicionales
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes (id) ON DELETE CASCADE,
    FOREIGN KEY (formulario_id) REFERENCES formularios_clientes (id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_clientes_slug ON clientes(slug);
CREATE INDEX IF NOT EXISTS idx_formularios_cliente ON formularios_clientes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_archivos_formulario ON archivos_clientes(formulario_id);
CREATE INDEX IF NOT EXISTS idx_logs_cliente ON logs_formulario(cliente_id);
CREATE INDEX IF NOT EXISTS idx_logs_fecha ON logs_formulario(fecha);

-- Trigger para actualizar fecha_actualizacion automáticamente
CREATE TRIGGER IF NOT EXISTS update_formulario_timestamp 
    AFTER UPDATE ON formularios_clientes
    FOR EACH ROW
BEGIN
    UPDATE formularios_clientes 
    SET fecha_actualizacion = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- Datos de ejemplo para testing
INSERT OR IGNORE INTO clientes (nombre_cliente, slug) VALUES 
    ('Empresa Ejemplo S.L.', 'empresa-ejemplo'),
    ('Trasteros Madrid', 'trasteros-madrid'),
    ('Almacenes Barcelona', 'almacenes-barcelona');
