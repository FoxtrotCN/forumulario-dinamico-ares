# 🚀 Guía de Instalación Rápida

## Sistema de Formularios Dinámicos para Clientes

### ⚡ Instalación Express (5 minutos)

#### **Paso 1: Preparar el Entorno**
```bash
# Verificar Python 3.11+
python3.11 --version

# Descargar el proyecto
# (descomprimir en carpeta deseada)
cd formulario-clientes
```

#### **Paso 2: Configurar Entorno Virtual**
```bash
# Crear entorno virtual
python3.11 -m venv venv

# Activar entorno virtual
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows
```

#### **Paso 3: Instalar Dependencias**
```bash
# Instalar paquetes requeridos
pip install -r requirements.txt
```

#### **Paso 4: Inicializar Base de Datos**
```bash
# Crear base de datos con datos de ejemplo
python database/init_db.py
```

#### **Paso 5: Ejecutar Aplicación**
```bash
# Iniciar servidor de desarrollo
python app.py
```

#### **Paso 6: Acceder al Sistema**
- Abrir navegador en: **http://localhost:5000**
- ¡Listo! El sistema está funcionando

---

## 🎯 URLs de Prueba

### **Página Principal**
```
http://localhost:5000/
```

### **Clientes de Ejemplo**
```
http://localhost:5000/cliente/empresa-ejemplo
http://localhost:5000/cliente/trasteros-madrid
http://localhost:5000/cliente/almacenes-barcelona
```

### **Crear Nuevo Cliente**
```
http://localhost:5000/cliente/mi-nueva-empresa
```
*(Se crea automáticamente al acceder)*

---

## 🔧 Configuración Opcional

### **Cambiar Puerto**
Editar `app.py` línea final:
```python
app.run(debug=True, host='0.0.0.0', port=8080)  # Puerto 8080
```

### **Configurar Base de Datos**
Editar `config.py`:
```python
DATABASE_PATH = BASE_DIR / 'mi_base_datos.db'
```

### **Personalizar Validaciones**
Editar `config.py` sección `VALIDATION_RULES`:
```python
VALIDATION_RULES = {
    'nif': r'^[0-9]{8}[A-Z]$',  # Personalizar regex
    'email': r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    # ... más validaciones
}
```

---

## 🚨 Solución de Problemas

### **Error: "No module named 'flask'"**
```bash
# Verificar que el entorno virtual esté activado
source venv/bin/activate
pip install flask
```

### **Error: "Port already in use"**
```bash
# Cambiar puerto en app.py o matar proceso
sudo lsof -t -i tcp:5000 | xargs kill -9
```

### **Error: "Database locked"**
```bash
# Reinicializar base de datos
rm database/formulario_clientes.db
python database/init_db.py
```

### **Error: "Permission denied"**
```bash
# Dar permisos de ejecución
chmod +x database/init_db.py
chmod +x app.py
```

---

## 📱 Acceso desde Otros Dispositivos

### **En la Misma Red**
1. Obtener IP del servidor:
```bash
ip addr show  # Linux
ipconfig      # Windows
```

2. Acceder desde otro dispositivo:
```
http://192.168.1.XXX:5000
```

### **Configurar Firewall (si es necesario)**
```bash
# Ubuntu/Debian
sudo ufw allow 5000

# CentOS/RHEL
sudo firewall-cmd --add-port=5000/tcp --permanent
sudo firewall-cmd --reload
```

---

## 🎨 Personalización Rápida

### **Cambiar Colores**
Editar `static/css/custom.css`:
```css
:root {
    --primary-color: #007bff;    /* Azul por defecto */
    --success-color: #28a745;    /* Verde */
    --warning-color: #ffc107;    /* Amarillo */
}
```

### **Modificar Logo/Título**
Editar `templates/base.html`:
```html
<title>Mi Sistema de Formularios</title>
<h1>Mi Empresa - Formularios</h1>
```

### **Agregar Campos Personalizados**
1. Editar template correspondiente en `templates/steps/`
2. Actualizar validaciones en `static/js/validation.js`
3. Modificar lógica de guardado en `app.py`

---

## 📊 Datos de Ejemplo

El sistema incluye **3 clientes de ejemplo**:

1. **Empresa Ejemplo S.L.** (`/cliente/empresa-ejemplo`)
2. **Trasteros Madrid** (`/cliente/trasteros-madrid`)  
3. **Almacenes Barcelona** (`/cliente/almacenes-barcelona`)

Todos empiezan con **0% de progreso** y pueden ser completados inmediatamente.

---

## 🔄 Reiniciar Sistema

### **Limpiar Datos**
```bash
# Eliminar base de datos
rm database/formulario_clientes.db

# Reinicializar con datos frescos
python database/init_db.py
```

### **Reiniciar Servidor**
```bash
# Detener servidor (Ctrl+C)
# Reiniciar
python app.py
```

---

## 📞 Soporte Rápido

### **Verificar Estado del Sistema**
```bash
# Verificar que Flask esté corriendo
curl http://localhost:5000

# Verificar base de datos
sqlite3 database/formulario_clientes.db ".tables"
```

### **Logs de Errores**
```bash
# Ver logs en tiempo real
tail -f logs/app.log

# Ver últimos errores
grep ERROR logs/app.log
```

---

## ✅ Checklist de Instalación

- [ ] Python 3.11+ instalado
- [ ] Proyecto descargado y descomprimido
- [ ] Entorno virtual creado y activado
- [ ] Dependencias instaladas (`pip install -r requirements.txt`)
- [ ] Base de datos inicializada (`python database/init_db.py`)
- [ ] Servidor iniciado (`python app.py`)
- [ ] Navegador abierto en `http://localhost:5000`
- [ ] Página principal carga correctamente
- [ ] Formulario de cliente funciona

---

**¡Sistema listo para usar! 🎉**

*Para más detalles, consultar `README.md`*
