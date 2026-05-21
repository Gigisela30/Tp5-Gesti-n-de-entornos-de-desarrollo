## Spec 05: Emisión de certificados
## Descripción

Este módulo permite la generación, distribución y validación de certificados digitales para participantes y disertantes. Transforma la acreditación de asistencia en un documento oficial (PDF) con validez institucional.
## 1. Objetivo y Contexto
El objetivo es automatizar el cierre administrativo de los eventos académicos. Asegura que solo quienes cumplieron con los requisitos de asistencia reciban su reconocimiento, proporcionando además un mecanismo de verificación pública para evitar fraudes.
## 2. Historias de Usuario y Criterios de Aceptación
    Historia: Como participante, quiero recibir mi certificado por correo para tener un comprobante digital.
    Criterio: El sistema envía el PDF tras la acreditación exitosa y finalización del evento.
    Historia: Como administrador, quiero un código de verificación en cada diploma.
    Criterio: Cada PDF incluye un código único vinculado a una base de datos de validación.
## 3. Requisitos Funcionales y Reglas de Negocio
    RF1: Generar certificados en PDF basados en plantillas.
    RF2: Envío automático de certificados por email.
    RF3: Portal de validación pública mediante código único o QR.
    Regla de negocio: Certificados solo se emiten si el participante está acreditado.
    Regla de negocio: El código de verificación es inmutable una vez generado.
## 4. Restricciones técnicas específicas
    Servicio de generación de PDF (ej. Puppeteer o similares).
    Almacenamiento de archivos en la nube (S3 o similar) para descarga persistente.
    Firma digital o Hash para integridad del documento.
## 5. Modelo de datos
    Entidades
    Certificado: {id (PK), id_evento (FK), id_participante (FK), fecha_emisión, código_verificación (Unique), url_archivo, tipo_rol}.
    Evento: {id (PK), título, fecha_fin, firma_autorizada (path)} (Referenciada de Spec 01).
    Participante/Usuario: {id (PK), nombre_completo, email, dni}.
    Relaciones
    Evento ↔ Certificado (1:N): Un evento puede tener muchos certificados asociados, pero cada certificado pertenece a un solo evento.
    Participante ↔ Certificado (1:N): Un participante puede recibir múltiples certificados (por distintos eventos), pero cada certificado es nominativo a un único participante.
    Acreditación ↔ Certificado (1:1): La existencia de un certificado está supeditada a una relación previa de "asistencia confirmada" (acreditación) entre el Participante y el Evento.
## 6. Plan de Tareas
    1.Diseñar el modelo de datos y sus migraciones.
    2.Crear plantillas dinámicas (HTML a PDF).
    3.Implementar el worker de envío masivo de correos.
    4.Desarrollar el buscador público de códigos de verificación.
## 7. Estrategia de Verificación
    Prueba de relación: Intentar generar un certificado para un usuario no inscrito en el evento (debe fallar).
    Prueba de negocio: Verificar que participantes no acreditados no figuren en la cola de emisión.
    Prueba de duplicidad: Asegurar que no se generen dos códigos iguales para distintos certificados.

////