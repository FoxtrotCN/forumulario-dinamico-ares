// --- View Switching Logic for Index Page ---
function initializeViewSwitcher() {
    const viewSwitchContainer = document.querySelector('.btn-group[aria-label="View switch"]');
    if (!viewSwitchContainer) return;

    const gridButton = viewSwitchContainer.querySelector('button[data-view="grid"]');
    const listButton = viewSwitchContainer.querySelector('button[data-view="list"]');
    const clientesContainer = document.getElementById('clientes-container');

    function switchView(viewType) {
        if (!clientesContainer) return;

        gridButton.classList.remove('active');
        listButton.classList.remove('active');

        if (viewType === 'grid') {
            gridButton.classList.add('active');
            clientesContainer.classList.remove('clientes-list');
            clientesContainer.classList.add('clientes-grid');
        } else {
            listButton.classList.add('active');
            clientesContainer.classList.remove('clientes-grid');
            clientesContainer.classList.add('clientes-list');
        }
        localStorage.setItem('clientView', viewType);
    }

    gridButton.addEventListener('click', () => switchView('grid'));
    listButton.addEventListener('click', () => switchView('list'));

    // Load saved preference
    const savedView = localStorage.getItem('clientView');
    switchView(savedView || 'grid');
}