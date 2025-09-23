import ApexCharts from 'apexcharts';
import * as Flowbite from 'flowbite';

let matriculasPorEstadoChart = null;
let estudiantesPorGeneroChart = null;
let estudiantesPorTipoDocumentoChart = null;

// Función para renderizar el gráfico de Matrículas por Estado
export async function renderMatriculasPorEstadoChart() {
    const chartElement = document.getElementById('matriculas-por-estado-chart');
    if (!chartElement) {
        console.warn(`Elemento con ID "matriculas-por-estado-chart" no encontrado para el gráfico.`);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/stats/matriculas-por-estado');
        const data = await response.json();

        const categories = data.map(item => item.matr_estado);
        const seriesData = data.map(item => item.cantidad);

        const options = {
            series: [{
                name: 'Matrículas',
                data: seriesData
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: true // Mostrar barra de herramientas para opciones de exportación de ApexCharts
                }
            },
            xaxis: {
                categories: categories
            },
            title: {
                text: 'Matrículas por Estado',
                align: 'center',
                style: {
                    color: '#e2e8f0' // Color del título más armonioso
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " matrículas"
                    }
                }
            },
            colors: ['#6366f1', '#eab308', '#ef4444', '#f97316'] // Paleta de colores armoniosa
        };

        if (matriculasPorEstadoChart) {
            matriculasPorEstadoChart.updateOptions(options); // Actualizar opciones si el gráfico ya existe
        } else {
            matriculasPorEstadoChart = new ApexCharts(chartElement, options);
            matriculasPorEstadoChart.render();
        }

    } catch (error) {
        console.error('Error al cargar datos para el gráfico de matrículas por estado:', error);
    }
}

// Función para renderizar el gráfico de Estudiantes por Género
export async function renderEstudiantesPorGeneroChart() {
    const chartElement = document.getElementById('estudiantes-por-genero-chart');
    if (!chartElement) {
        console.warn(`Elemento con ID "estudiantes-por-genero-chart" no encontrado para el gráfico.`);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/stats/estudiantes-por-genero');
        const data = await response.json();

        if (!data || data.length === 0) {
            chartElement.innerHTML = '<p style="color: #e2e8f0; text-align: center; margin-top: 20px;">No hay datos disponibles para Estudiantes por Género.</p>';
            if (estudiantesPorGeneroChart) {
                estudiantesPorGeneroChart.destroy();
                estudiantesPorGeneroChart = null;
            }
            console.warn('No hay datos para el gráfico de estudiantes por género.');
            return;
        }

        const categories = data.map(item => item.estu_genero);
        const seriesData = data.map(item => item.cantidad);

        const options = {
            series: seriesData,
            chart: {
                type: 'donut',
                height: 200,
                toolbar: {
                    show: true
                }
            },
            labels: categories,
            title: {
                text: 'Estudiantes por Género',
                align: 'center',
                style: {
                    color: '#e2e8f0'
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#3b82f6', '#ec4899', '#a855f7'] // Paleta de colores armoniosa
        };

        if (estudiantesPorGeneroChart) {
            estudiantesPorGeneroChart.updateOptions(options);
        } else {
            estudiantesPorGeneroChart = new ApexCharts(chartElement, options);
            estudiantesPorGeneroChart.render();
        }

    } catch (error) {
        console.error('Error al cargar datos para el gráfico de estudiantes por género:', error);
    }
}

// Función para renderizar el gráfico de Estudiantes por Tipo de Documento
export async function renderEstudiantesPorTipoDocumentoChart() {
    const chartElement = document.getElementById('estudiantes-por-tipo-documento-chart');
    if (!chartElement) {
        console.warn(`Elemento con ID "estudiantes-por-tipo-documento-chart" no encontrado para el gráfico.`);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/stats/estudiantes-por-tipo-documento');
        const data = await response.json();

        const categories = data.map(item => item.estu_tipo_documento);
        const seriesData = data.map(item => item.cantidad);

        const options = {
            series: seriesData,
            chart: {
                type: 'pie',
                height: 200,
                toolbar: {
                    show: true
                }
            },
            labels: categories,
            title: {
                text: 'Estudiantes por Tipo de Documento',
                align: 'center',
                style: {
                    color: '#e2e8f0'
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#10b981', '#f59e0b', '#8b5cf6'] // Paleta de colores armoniosa
        };

        if (estudiantesPorTipoDocumentoChart) {
            estudiantesPorTipoDocumentoChart.updateOptions(options);
        } else {
            estudiantesPorTipoDocumentoChart = new ApexCharts(chartElement, options);
            estudiantesPorTipoDocumentoChart.render();
        }

    } catch (error) {
        console.error('Error al cargar datos para el gráfico de estudiantes por tipo de documento:', error);
    }
}

export function initializeCharts() {
    // Flowbite se inicializa automáticamente si sus scripts están cargados correctamente en el HTML

    console.log("Inicializando gráficos...");
    renderMatriculasPorEstadoChart();
    renderEstudiantesPorGeneroChart();
    renderEstudiantesPorTipoDocumentoChart();
}

// Exportar los gráficos para poder actualizarlos desde fuera
export { matriculasPorEstadoChart, estudiantesPorGeneroChart, estudiantesPorTipoDocumentoChart };