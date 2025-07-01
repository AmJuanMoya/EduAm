import {convertJSON, DataTable} from "simple-datatables";
import { tableData  } from "../stores/GeneralStores";

class TableManager {
    constructor(tableSelector = "#table") {
        this.tableSelector = tableSelector;
        this.dataTable = null;
        this.tableElement = null;
        this.isInitialized = false;
    }

    // Inicializar el manager de tablas
    init() {
        this.tableElement = document.getElementById(this.tableSelector.replace('#', ''));
        
        if (!this.tableElement) {
            console.error(`Elemento de tabla no encontrado: ${this.tableSelector}`);
            return false;
        }
        // Marcar como inicializado ANTES de suscribirse
        this.isInitialized = true;

        // Suscribirse a cambios en el store
        tableData.subscribe(() => {
            this.updateTable();
        });

        // console.log('TableManager inicializado correctamente');
        return true;
    }

    // Crear una nueva tabla
    createTable() {
        if (!this.isInitialized) {
            console.error('TableManager no ha sido inicializado. Llama a init() primero.');
            return null;
        }

        // Limpiar el contenido del contenedor
        this.tableElement.innerHTML = '';
        
        let data = tableData.get().data;
        // console.log("Data recibida:", data);

        if (!data || data.length === 0) {
            this.tableElement.innerHTML = '<p class="text-center p-4">No hay datos disponibles</p>';
            return null;
        }

        const convertedData = convertJSON({
            data: JSON.stringify(data)
        });

        try {
            this.dataTable = new DataTable(this.tableSelector, {
                data: convertedData, 
                searchable: true,
                perPage: 10,
                perPageSelect: [1, 5, 10, 15, 20],
                labels: {
                    placeholder: "Buscar",
                    perPage: "registros por pagina",
                    noRows: "No hay registros que mostrar",
                    info: "Mostrando {start} a {end} de {rows} registros"
                }
            });

            // console.log('Tabla creada exitosamente');
            return this.dataTable;
        } catch (error) {
            console.error('Error al crear la tabla:', error);
            return null;
        }
    }

    // Actualizar la tabla con nuevos datos
    updateTable() {
        if (!this.isInitialized) {
            console.log('TableManager no inicializado, saltando actualización');
            return;
        }
        console.log('Actualizando tabla...');
        
        // Destruir la instancia anterior si existe
        this.destroyTable();
        
        // Crear nueva instancia
        return this.createTable();
    }

    // Destruir la tabla actual
    destroyTable() {
        if (this.dataTable) {
            try {
                this.dataTable.destroy();
                console.log('adios tabla...');
            } catch (error) {
                console.error('Error al destruir la tabla:', error);
            } finally {
                this.dataTable = null;
            }
        }
    }

    // Obtener la instancia actual de la tabla
    getTable() {
        return this.dataTable;
    }

    // Verificar si la tabla existe
    isTableExists() {
        return this.dataTable !== null;
    }

    // Limpiar completamente (destruir tabla y resetear estado)
    cleanup() {
        this.destroyTable();
        this.isInitialized = false;
        this.tableElement = null;
    }

    // Método para forzar la recreación de la tabla
    refresh() {
        return this.updateTable();
    }
}

// Exportar una instancia singleton
export const tableManager = new TableManager();

// También exportar la clase por si se necesita crear múltiples instancias
export { TableManager };