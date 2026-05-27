# Spec 01 : Gestión de eventos

## Descripción.
Este módulo permite crear, editar y visualizar eventos académicos en la plataforma.  
Incluye la definición de tipo de evento, fecha, cupo mínimo y máximo, y estado (activo, finalizado).

## 1. Objetivo y Contexto
Este módulo asegura que los eventos académicos puedan ser creados, editados y gestionados de forma ordenada.  ..
Es el núcleo del sistema, ya que define la información básica de cada evento (tipo, fecha, cupo, estado)

## 2. Historias de Usuario y Criterios de Aceptación
- Historia: Como organizador quiero crear un evento para que los participantes puedan inscribirse.  
  Criterio: El sistema muestra el evento en el listado público tras la creación.
- Historia: Como participante quiero ver un listado de eventos para decidir en cuál inscribirme.  
  Criterio: El sistema permite filtrar entre eventos futuros y pasados.


- Historia (enriquecida - seguridad):  
  Como organizador quiero crear un evento de forma segura, de modo que los datos del evento no puedan ser alterados por usuarios no autorizados.  

  Criterios de aceptación:  
  - Validación de roles y permisos antes de crear/editar eventos.  
  - Sanitización de entradas contra SQL Injection.  
  - Uso obligatorio de HTTPS en la transmisión de datos.

## 3. Requisitos Funcionales y Reglas de Negocio
- RF1: El sistema debe permitir al organizador crear un evento con título, tipo, fecha y cupo.  
- RF2: El sistema debe permitir modificar datos de un evento existente.  
- RF3: El sistema debe mostrar un listado público de eventos con filtros (futuros/pasados).  
- RF4: El sistema debe permitir eliminar eventos que aún no tengan inscripciones.  
- Regla de negocio: No se permite crear eventos con fecha anterior a la actual.  
- Regla de negocio: Los cupos mínimos y máximos deben ser valores positivos.

## 4. Restricciones técnicas específicas
- Compatible con navegadores modernos (Chrome, Edge, Firefox).  
- Base de datos relacional para almacenar eventos.  
- Accesible desde dispositivos móviles.

## 5. Modelo de datos
- Entidad Evento: {id, título, tipo, fecha, cupo_min, cupo_max, estado}.  
- Relación: Evento ↔ Participante (inscripciones).

## 6. Plan de Tareas
1. Diseñar formulario de creación de eventos.  
2. Implementar validación de fechas y cupos.  
3. Configurar listado público con filtros.  
4. Implementar edición y eliminación de eventos.

## 7. Estrategia de Verificación
- Prueba de creación de evento válido.  
- Prueba de creación con fecha inválida (rechazo).  
- Prueba de listado con filtros correctos.  
- Prueba de eliminación de evento sin inscripciones.

