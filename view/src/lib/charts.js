import ApexCharts from 'apexcharts';
import * as Flowbite from 'flowbite'; // Importa todo Flowbite si es necesario para la inicialización

export function initializeCharts() {
    // Inicializar Flowbite si no se inicializa automáticamente por data-attributes
    // Si Flowbite ya se inicializa de otra manera (e.g., por scripts globales en Astro), esta línea puede ser redundante o causar conflictos.
    // Flowbite.init(); // Descomenta si necesitas inicializar componentes de Flowbite programáticamente

    console.log("Inicializando gráficos...");

    // Gráfico de Matrículas por Estado
    const matriculasPorEstadoChartElement = document.getElementById('matriculas-por-estado-chart');
    if (matriculasPorEstadoChartElement) {
        fetch('http://localhost:3000/api/stats/matriculas-por-estado')
            .then(response => response.json())
            .then(data => {
                const categories = data.map(item => item.matr_estado);
                const seriesData = data.map(item => item.cantidad);

                const options = {
                    series: [{
                        name: 'Matrículas',
                        data: seriesData
                    }],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    xaxis: {
                        categories: categories
                    },
                    title: {
                        text: 'Matrículas por Estado',
                        align: 'center'
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
                    }
                };
                new ApexCharts(matriculasPorEstadoChartElement, options).render();
            })
            .catch(error => console.error('Error al cargar datos para el gráfico de matrículas por estado:', error));
    }

    // Gráfico de Estudiantes por Género
    const estudiantesPorGeneroChartElement = document.getElementById('estudiantes-por-genero-chart');
    if (estudiantesPorGeneroChartElement) {
        fetch('http://localhost:3000/api/stats/estudiantes-por-genero')
            .then(response => response.json())
            .then(data => {
                const categories = data.map(item => item.estu_genero);
                const seriesData = data.map(item => item.cantidad);

                const options = {
                    series: seriesData,
                    chart: {
                        type: 'donut',
                        height: 200 // Ajustar altura para el layout
                    },
                    labels: categories,
                    title: {
                        text: 'Estudiantes por Género',
                        align: 'center'
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
                    }]
                };
                new ApexCharts(estudiantesPorGeneroChartElement, options).render();
            })
            .catch(error => console.error('Error al cargar datos para el gráfico de estudiantes por género:', error));
    }

    // Gráfico de Estudiantes por Tipo de Documento
    const estudiantesPorTipoDocumentoChartElement = document.getElementById('estudiantes-por-tipo-documento-chart');
    if (estudiantesPorTipoDocumentoChartElement) {
        fetch('http://localhost:3000/api/stats/estudiantes-por-tipo-documento')
            .then(response => response.json())
            .then(data => {
                const categories = data.map(item => item.estu_tipo_documento);
                const seriesData = data.map(item => item.cantidad);

                const options = {
                    series: seriesData,
                    chart: {
                        type: 'pie',
                        height: 200 // Ajustar altura para el layout
                    },
                    labels: categories,
                    title: {
                        text: 'Estudiantes por Tipo de Documento',
                        align: 'center'
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
                    }]
                };
                new ApexCharts(estudiantesPorTipoDocumentoChartElement, options).render();
            })
            .catch(error => console.error('Error al cargar datos para el gráfico de estudiantes por tipo de documento:', error));
    }
}