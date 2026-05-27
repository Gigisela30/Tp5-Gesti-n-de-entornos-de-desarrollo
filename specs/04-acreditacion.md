## Spec 04: Acreditación de participantes
## Descripción
Este módulo se encarga del control de asistencia efectivo durante el desarrollo del evento. Transforma a un "inscripto" en un "asistente acreditado", validando su presencia física o virtual en tiempo real. Es el paso previo indispensable para la posterior emisión de certificados.
## 1. Objetivo y Contexto
El objetivo es garantizar un registro fidedigno de quiénes asistieron realmente al evento. Este módulo es crítico para la logística del día del evento y actúa como un filtro de seguridad y calidad, asegurando que solo los participantes presentes cumplan con los requisitos para recibir certificaciones o acceder a material exclusivo.
## 2. Historias de Usuario y Criterios de Aceptación
    •Historia: Como organizador, quiero registrar la llegada de un participante de forma rápida para evitar filas en el ingreso.
        oCriterio de Aceptación: El sistema permite buscar al participante por nombre o DNI/Email y marcar su asistencia con un solo clic, registrando la hora exacta.
    •Historia: Como organizador, quiero ver en tiempo real cuántos participantes han sido acreditados frente al total de inscriptos.
        oCriterio de Aceptación: Existe un indicador o dashboard que muestra el porcentaje de asistencia durante el proceso.
    •Historia: Como participante, quiero que mi acreditación quede registrada para asegurar la recepción de mi certificado post-evento.
        oCriterio de Aceptación: El sistema cambia el estado del participante a "Acreditado" de forma irreversible para esa sesión.
## 3. Requisitos Funcionales y Reglas de Negocio
    •RF1: El sistema debe listar a todos los usuarios inscriptos (provenientes de Spec 02) filtrados por evento.
    •RF2: El sistema debe proporcionar un buscador en tiempo real para localizar participantes en la lista de acreditación.
    •RF3: El sistema debe permitir el "Check-in" (acreditación) manual por parte del personal del evento.
    •RF4: El sistema debe registrar automáticamente la marca de tiempo (timestamp) del momento de la acreditación.
    •Regla de Negocio: Solo pueden ser acreditados aquellos usuarios que tengan una inscripción previa con estado "Confirmada".
    •Regla de Negocio: La acreditación solo puede realizarse dentro del rango de fecha y hora definido para el evento (o un margen de tiempo configurable, ej: 1 hora antes).
    •Regla de Negocio: Un participante acreditado es el único perfil habilitado por el sistema para la generación automática de certificados (vínculo con módulos futuros).
## 4. Restricciones Técnicas Específicas
    •Rendimiento: La búsqueda y el registro de asistencia deben ser optimizados para entornos con alta concurrencia (muchos ingresos simultáneos).
    •Interfaz: La vista de acreditación debe ser Mobile First, facilitando que los organizadores acrediten desde celulares o tablets en la puerta del evento.
    •Sincronización: Se recomienda el uso de WebSockets o consultas asíncronas para actualizar el contador de asistentes en tiempo real en varios dispositivos.
## 5. Modelo de Datos
    •Entidad Acreditación: {id, id_evento (FK), id_participante (FK), hora_acreditacion (datetime), id_usuario_staff (FK)}.
    •Relación: Una Inscripción (Spec 02) se vincula con una Acreditación.
    •Estado: Se debe añadir o actualizar el campo estado en la relación
    Participante/Evento a "Acreditado".
## 6. Plan de Tareas
    1.Crear la tabla de Acreditaciones con las relaciones correspondientes a Eventos y Participantes.
    2.Diseñar la interfaz de "Panel de Acreditación" con buscador y lista de inscriptos.
    3.Implementar la lógica de Backend para insertar registros en la tabla de acreditación validando reglas de negocio (fecha y estado de inscripción).
    4.Desarrollar el componente visual de "Estado de Asistencia" (Contador: X/Total).
    5.Optimizar la búsqueda de usuarios mediante índices en la base de datos (por nombre y email).
## 7. Estrategia de Verificación
    •Prueba de Acreditación: Seleccionar un inscripto y confirmar asistencia; verificar que se cree el registro con la hora actual.
    •Prueba de Restricción: Intentar acreditar a una persona no inscripta (el sistema no debe encontrarla en la lista de ese evento).
    •Prueba de Fecha: Intentar acreditar en un evento cuya fecha es futura o pasada (el sistema debe bloquear la acción).
    •Prueba de Duplicidad: Intentar acreditar dos veces al mismo participante (el sistema debe indicar que ya se encuentra acreditado).
