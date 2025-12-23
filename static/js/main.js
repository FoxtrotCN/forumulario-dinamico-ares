// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Lógica específica para la página del formulario
    if (document.getElementById('dynamic-form')) {
        window.formularioCliente = new FormularioCliente();
    }

    // Lógica específica para la página de inicio (index)
    if (document.getElementById('clientes-container')) {
        initializeViewSwitcher();
    }
    
    // Inicializar tooltips globalmente
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});