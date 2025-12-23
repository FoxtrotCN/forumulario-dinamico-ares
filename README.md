# Sistema de Formularios Dinámicos para Clientes

## 📋 Descripción del Proyecto

Sistema web desarrollado en Flask que permite crear formularios dinámicos paso a paso para la configuración de nuevos clientes. Cada cliente tiene su propia URL personalizada y el sistema guarda automáticamente el progreso del formulario.

## ✨ Características Principales

### 🎯 **Funcionalidades Core**
- **Formularios paso a paso** con 6 secciones bien definidas
- **Barra de progreso** visual y numérica en tiempo real
- **Guardado automático** cada 30 segundos
- **Validaciones en tiempo real** con feedback visual
- **Rutas dinámicas** por cliente (`/cliente/nombre-cliente`)
- **Base de datos SQLite** para persistencia de datos
- **Interfaz responsiva** con Bootstrap 5.3

### 📊 **Estructura del Formulario**

#### **Paso 1: Datos de la Empresa**
- Información fiscal (NIF/CIF con validación)
- Datos de contacto (teléfono, email, dirección)
- Información bancaria (IBAN con validación)
- Datos del representante legal

#### **Paso 2: Información de Trasteros**
- Configuración dinámica de trasteros
- Cálculo automático de precios e IVA
- Gestión de tarifas y descuentos
- Resumen financiero en tiempo real

#### **Paso 3: Usuarios de la Aplicación**
- Gestión de hasta 3 usuarios
- Asignación de roles y permisos
- Validación de emails únicos
- Medidor de fortaleza de contraseñas

#### **Paso 4: Configuración de Correo**
- Configuración SMTP personalizada
- Presets para Gmail, Outlook, etc.
- Prueba de conexión en tiempo real
- Configuración de plantillas de email

#### **Paso 5: Niveles de Acceso**
- Definición de permisos por módulo
- Configuración de restricciones
- Gestión de roles personalizados
- Control de acceso granular

#### **Paso 6: Documentación**
- Subida de contratos (.docx)
- Planos gráficos (imágenes, PDF)
- Logo de la empresa
- Documentación adicional
- Notas y comentarios

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Flask 2.3.3** - Framework web de Python
- **SQLite** - Base de datos ligera
- **Python 3.11** - Lenguaje de programación

### **Frontend**
- **Bootstrap 5.3** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografía
- **JavaScript Vanilla** - Interactividad
- **HTML5/CSS3** - Estructura y estilos

### **Validaciones**
- **NIF/CIF español** - Algoritmo de validación
- **IBAN** - Verificación de dígitos de control
- **Email** - Formato y unicidad
- **Teléfonos** - Formato español

## 📁 Estructura del Proyecto

```
formulario-clientes/
├── app.py                      # Aplicación principal Flask
├── config.py                   # Configuración de la aplicación
├── requirements.txt            # Dependencias de Python
├── README.md                   # Documentación del proyecto
├── 
├── database/
│   ├── schema.sql             # Esquema de la base de datos
│   ├── init_db.py            # Script de inicialización
│   └── formulario_clientes.db # Base de datos SQLite
├── 
├── models/
│   ├── __init__.py
│   ├── cliente.py            # Modelo Cliente
│   └── formulario.py         # Modelo Formulario
├── 
├── templates/
│   ├── base.html             # Template base
│   ├── index.html            # Página principal
│   ├── formulario.html       # Template principal del formulario
│   └── steps/                # Templates de cada paso
│       ├── paso1_empresa.html
│       ├── paso2_trasteros.html
│       ├── paso3_usuarios.html
│       ├── paso4_correo.html
│       ├── paso5_niveles.html
│       └── paso6_documentacion.html
├── 
├── static/
│   ├── css/
│   │   └── custom.css        # Estilos personalizados
│   ├── js/
│   │   ├── formulario.js     # JavaScript principal
│   │   └── validation.js     # Validaciones JavaScript
│   └── uploads/              # Archivos subidos
└── 
└── venv/                     # Entorno virtual de Python
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Python 3.11 o superior
- pip (gestor de paquetes de Python)
- Git (opcional)

### **Pasos de Instalación**

1. **Clonar o descargar el proyecto**
```bash
# Si tienes Git instalado
git clone <url-del-repositorio>
cd formulario-clientes

# O descargar y extraer el ZIP
```

2. **Crear entorno virtual**
```bash
python3.11 -m venv venv
source venv/bin/activate  # En Linux/Mac
# venv\Scripts\activate   # En Windows
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Inicializar base de datos**
```bash
python database/init_db.py
```

5. **Ejecutar la aplicación**
```bash
python app.py
```

6. **Acceder a la aplicación**
- Abrir navegador en: `http://localhost:5000`

## 🎮 Uso del Sistema

### **Página Principal**
- Muestra lista de clientes disponibles
- Indica progreso de cada formulario
- Permite acceder a formularios específicos

### **Formulario Dinámico**
- Navegación paso a paso
- Guardado automático del progreso
- Validaciones en tiempo real
- Barra de progreso visual

### **URLs de Ejemplo**
- Página principal: `http://localhost:5000/`
- Cliente específico: `http://localhost:5000/cliente/empresa-ejemplo`
- Nuevo cliente: `http://localhost:5000/cliente/mi-nueva-empresa`

## 🔧 API Endpoints

### **Rutas Principales**
- `GET /` - Página principal con lista de clientes
- `GET /cliente/<nombre>` - Formulario específico de cliente
- `POST /api/save` - Guardar datos del formulario
- `POST /api/upload` - Subir archivos
- `POST /api/test-email` - Probar configuración de email
- `GET /api/clientes` - Lista de clientes (JSON)

### **Ejemplo de Uso de API**
```javascript
// Guardar datos del formulario
fetch('/api/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        cliente_id: 'uuid-del-cliente',
        paso: 1,
        datos: {
            nombre_empresa: 'Mi Empresa S.L.',
            nif_cif: '12345678A',
            // ... más datos
        }
    })
});
```

## 📊 Base de Datos

### **Tablas Principales**

#### **clientes**
- `id` - Identificador único
- `nombre_cliente` - Nombre de la empresa
- `slug` - URL amigable
- `fecha_creacion` - Timestamp de creación
- `activo` - Estado del cliente
- `completado` - Si el formulario está completo

#### **formularios_clientes**
- `id` - Identificador único
- `cliente_id` - Referencia al cliente
- `datos_empresa` - JSON con datos del paso 1
- `info_trasteros` - JSON con datos del paso 2
- `usuarios_app` - JSON con datos del paso 3
- `config_correo` - JSON con datos del paso 4
- `niveles_acceso` - JSON con datos del paso 5
- `documentacion` - JSON con datos del paso 6
- `paso_actual` - Paso actual del formulario
- `porcentaje_completado` - Progreso en porcentaje

#### **archivos_clientes**
- Gestión de archivos subidos
- Referencias a documentos y logos
- Metadatos de archivos

## 🎨 Personalización

### **Estilos CSS**
- Modificar `static/css/custom.css` para cambios visuales
- Bootstrap 5.3 como base, fácil personalización
- Variables CSS para colores y espaciado

### **Validaciones**
- Configurar reglas en `config.py`
- Personalizar validaciones JavaScript en `static/js/validation.js`
- Agregar nuevas validaciones backend en `app.py`

### **Campos del Formulario**
- Modificar templates en `templates/steps/`
- Actualizar esquema de base de datos si es necesario
- Ajustar lógica de guardado en `app.py`

## 🔒 Seguridad

### **Medidas Implementadas**
- Validación de archivos subidos
- Sanitización de datos de entrada
- Protección CSRF (Flask-WTF recomendado para producción)
- Validación de tipos de archivo
- Límites de tamaño de archivo

### **Recomendaciones para Producción**
- Usar HTTPS
- Configurar SECRET_KEY segura
- Implementar autenticación de usuarios
- Usar base de datos PostgreSQL o MySQL
- Configurar backup automático
- Implementar logging de auditoría

## 🚀 Despliegue

### **Desarrollo Local**
```bash
python app.py
# Servidor de desarrollo en puerto 5000
```

### **Producción con Gunicorn**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### **Producción con Docker**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 📈 Monitoreo y Logs

### **Logs de la Aplicación**
- Configurados en `config.py`
- Archivo de log: `logs/app.log`
- Niveles: INFO, WARNING, ERROR

### **Métricas Disponibles**
- Número de clientes registrados
- Formularios completados
- Progreso promedio
- Archivos subidos

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Implementar cambios con tests
4. Enviar Pull Request

### **Estándares de Código**
- PEP 8 para Python
- Comentarios en español
- Tests unitarios recomendados
- Documentación actualizada

## 📞 Soporte

### **Problemas Comunes**

#### **Error de Base de Datos**
```bash
# Reinicializar base de datos
python database/init_db.py
```

#### **Problemas de Dependencias**
```bash
# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

#### **Puerto en Uso**
```bash
# Cambiar puerto en app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🔄 Changelog

### **Versión 1.0.0** (2025-09-24)
- ✅ Implementación inicial del sistema
- ✅ 6 pasos de formulario completos
- ✅ Base de datos SQLite funcional
- ✅ Interfaz responsiva con Bootstrap 5.3
- ✅ Validaciones en tiempo real
- ✅ Guardado automático
- ✅ Subida de archivos
- ✅ Barra de progreso dinámica

## 🎯 Roadmap Futuro

### **Versión 1.1.0**
- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Exportación a PDF
- [ ] Notificaciones por email
- [ ] API REST completa

### **Versión 1.2.0**
- [ ] Integración con CRM
- [ ] Plantillas de formulario personalizables
- [ ] Dashboard de analytics
- [ ] Backup automático
- [ ] Multi-idioma

---

**Desarrollado con ❤️ para optimizar la gestión de clientes**

*Sistema de Formularios Dinámicos © 2025*
