## Spec 06: Generación de informes
## Descripción

 Este módulo permite obtener datos analíticos y estadísticos sobre el desempeño de los eventos. Facilita la toma de decisiones mediante la visualización y exportación de métricas clave como el nivel de convocatoria, la tasa de asistencia y el volumen de certificados emitidos.
 ## 1. Objetivo y Contexto
El objetivo principal es transformar los datos almacenados en información útil para los organizadores. Este módulo centraliza la actividad de las otras áreas (Inscripciones, Acreditaciones y Certificados) para medir el éxito de los eventos académicos y cumplir con requisitos administrativos de reporte.
## 2. Historias de Usuario y Criterios de Aceptación
    Historia: Como organizador, quiero ver un informe detallado con la cantidad de inscriptos y acreditados para evaluar el impacto de mi evento.
    Criterio: El sistema genera una tabla o gráfico comparativo que muestra el total de inscriptos vs. el total de personas que efectivamente asistieron.
    Historia: Como administrador, quiero exportar los datos de asistencia para procesarlos en otras herramientas de oficina.
    Criterio: El sistema permite la descarga de los informes en formatos estándar como PDF (para presentación) y CSV/Excel (para análisis de datos).
    Historia: Como organizador, quiero filtrar los reportes por rango de fechas o tipo de evento para obtener datos específicos.
    Criterio: El sistema ofrece selectores de fecha y categorías para segmentar la información mostrada.
 ##  3. Requisitos Funcionales y Reglas de Negocio
    RF1: El sistema debe calcular automáticamente el porcentaje de asistencia (Acreditados / Inscriptos).
    RF2: El sistema debe permitir la exportación de reportes en formatos PDF y CSV.
    RF3: El sistema debe mostrar un resumen visual (dashboard) con los eventos más concurridos.
    Regla de negocio: Los informes solo incluyen datos de eventos que ya han iniciado o finalizado (no se proyectan datos de eventos futuros sin inscripciones).
    Regla de negocio: El tiempo de generación del reporte no debe exceder los 10 segundos para bases de datos extensas.
    Regla de negocio: Los archivos exportados deben incluir un encabezado con la fecha y hora de generación.
##  5. Modelo de datos
    Entidades implicadas (Solo lectura)
    Evento: Para obtener títulos y fechas.
    Inscripción: Para contar los participantes interesados.
    Acreditación: Para verificar la asistencia real.
    Certificado: Para contabilizar los documentos emitidos.
    Relaciones
    Este módulo funciona mediante Consultas de Agregación (JOINs) entre la entidad Evento y sus entidades relacionadas.
    Evento ↔ Inscripción (1:N): Conteo de registros vinculados.
    Inscripción ↔ Acreditación (1:1/0): Validación de cuántas inscripciones pasaron a estado acreditado.
    Acreditación ↔ Certificado (1:1/0): Relación para medir la eficiencia en la entrega de certificados.
##  6. Plan de Tareas
    Desarrollar las consultas SQL (Views o Stored Procedures) para consolidar las estadísticas.
    Diseñar la interfaz de usuario para el panel de control (Dashboard).
    Implementar los módulos de exportación a PDF y CSV.
    Configurar los filtros de búsqueda y segmentación por fecha.
## 7. Estrategia de Verificación
    Prueba de cálculo: Validar que la suma de acreditados coincida con los registros de la tabla Acreditación para un evento X.
    Prueba de exportación: Descargar un archivo CSV y verificar que pueda abrirse correctamente en Excel sin errores de codificación (UTF-8).
    Prueba de filtros: Comprobar que al filtrar por un mes específico, no se muestren datos de eventos fuera de ese periodo.
    Prueba de consistencia: Asegurar que un certificado emitido siempre sea contabilizado dentro del reporte de "Finalizados".