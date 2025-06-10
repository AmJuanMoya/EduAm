document.addEventListener("DOMContentLoaded", function() {
    console.log("Plantilla Actualizada. 😎");

    // Elementos del DOM
    const modalAgregar = document.getElementById('modalAgregar');
    const buscarFiltrosInput = document.getElementById('buscarFiltros');
    const filterParamSelect = document.getElementById('filterParam');
    const userTableBody = document.getElementById('userTableBody');
    const userIdDisplay = document.getElementById('userIdDisplay');

    // Inicializar el texto de usuario
    userIdDisplay.textContent = "Usuario Demo";

    // --- Funcionalidad de Botones de Acción de la Tabla ---

    userTableBody.addEventListener('click', function(event) {
        // Botón Editar
        const editButton = event.target.closest('.custom-edit-btn');
        if (editButton) {
            event.preventDefault();
            alert("Aquí editarías los datos. ✏️");
            const dropdown = editButton.closest('.dropdown');
            if (dropdown) {
                dropdown.classList.remove('is-active');
            }
        }

        // Botón Eliminar
        const deleteButton = event.target.closest('.custom-delete-btn');
        if (deleteButton) {
            event.preventDefault();
            if (confirm("¿Estás seguro que quieres eliminar esto? 😱")) {
                const row = deleteButton.closest("tr");
                if (row) {
                    row.remove();
                }
            }
            const dropdown = deleteButton.closest('.dropdown');
            if (dropdown) {
                dropdown.classList.remove('is-active');
            }
        }
    });

    // --- Funcionalidad del registro de Agregar Usuario ---

    document.querySelector(".btn-agregar").addEventListener("click", function () {
        modalAgregar.classList.add("is-active");
    });

    document.getElementById("cerrarModal").addEventListener("click", function () {
        modalAgregar.classList.remove("is-active");
    });

    document.getElementById("cancelarModal").addEventListener("click", function () {
        modalAgregar.classList.remove("is-active");
    });

    document.querySelector(".modal-background").addEventListener("click", function () {
        modalAgregar.classList.remove("is-active");
    });

    document.getElementById("guardarUsuario").addEventListener("click", function(event) {
        event.preventDefault();
        alert("La función de guardar está deshabilitada por el momento.");
    });


    // --- Filtrado de Tabla ---
    function filterTable() {
        const filter = buscarFiltrosInput.value.toLowerCase();
        const param = filterParamSelect.value;
        const rows = userTableBody.querySelectorAll('tr');

        // Mapeo de valores de select a índices de columna
        const columnIndexMap = {
            'ID': 0,
            'nombre': 1,
            'apellido': 2,
            'telefono': 3,
            'email': 4,
            'rol': 5
        };

        rows.forEach(row => {
            let cellContent = '';
            if (param === 'all') {
                cellContent = Array.from(row.cells).map(cell => cell.textContent).join(' ').toLowerCase();
            } else {
                const columnIndex = columnIndexMap[param];
                if (columnIndex !== undefined && row.cells[columnIndex]) {
                    cellContent = row.cells[columnIndex].textContent.toLowerCase();
                }
            }

            if (cellContent.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    buscarFiltrosInput.addEventListener('keyup', filterTable);
    filterParamSelect.addEventListener('change', filterTable);


    // --- Manejo de Dropdowns (activación al clic) ---
    document.addEventListener('click', (event) => {
        const dropdownTrigger = event.target.closest('.dropdown-trigger');
        if (dropdownTrigger) {
            const dropdown = dropdownTrigger.closest('.dropdown');
            document.querySelectorAll('.dropdown.is-active').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('is-active');
                }
            });
            dropdown.classList.toggle('is-active');
        } else {
            document.querySelectorAll('.dropdown.is-active').forEach(dropdown => {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('is-active');
                }
            });
        }
    });

});


