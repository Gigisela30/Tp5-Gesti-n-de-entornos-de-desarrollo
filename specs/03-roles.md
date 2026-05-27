
## Spec 03: Gestión de Roles
## Descripción
Este módulo centraliza la administración de permisos y accesos dentro de la plataforma. Define las capacidades de los usuarios según su perfil (Organizador, Disertante, Participante) y asegura que cada funcionalidad del sistema esté protegida y disponible solo para el rol correspondiente.
## 1. Objetivo y Contexto
    El objetivo es establecer un control de acceso basado en roles (RBAC) para garantizar la seguridad y la integridad de los datos. Este módulo es transversal a toda la aplicación, ya que condiciona la interfaz y las acciones que Spec 01 (Eventos) y Spec 02 (Inscripciones) permiten realizar a cada usuario.
## 2. Historias de Usuario y Criterios de Aceptación
    •Historia: Como administrador del sistema u organizador, quiero asignar un rol específico a un usuario para delegar responsabilidades.
        oCriterio de Aceptación: El cambio de rol se aplica de inmediato y el usuario ve actualizada su interfaz según sus nuevos permisos.
    •Historia: Como participante, quiero ver solo las opciones de inscripción y mis certificados para evitar confusión con herramientas administrativas.
        oCriterio de Aceptación: El menú lateral y las rutas protegidas impiden el acceso a la creación de eventos o gestión de otros usuarios.
    •Historia: Como disertante, quiero acceder a la lista de asistentes de mi evento para preparar mi material.
        oCriterio de Aceptación: El sistema identifica al usuario como "disertante" vinculado a un evento y le otorga permisos de lectura sobre la nómina de ese evento específico.
## 3. Requisitos Funcionales y Reglas de Negocio
    •RF1: El sistema debe permitir la creación de tres roles predefinidos: Organizador, Disertante y Participante.
    •RF2: El sistema debe restringir el acceso a las rutas de API y vistas de frontend mediante un Middleware de autorización.
    •RF3: El sistema debe permitir que un Organizador ascienda a un Participante al rol de Disertante o Co-Organizador.
    •RF4: Interfaz de usuario adaptable: los componentes visuales (botones de editar, borrar, crear) deben renderizarse condicionalmente según el rol.
    •Regla de Negocio: Cada usuario registrado debe poseer, de forma obligatoria, al menos un rol activo (por defecto: Participante).
    •Regla de Negocio: El rol de "Organizador" es el único con permisos para eliminar eventos o modificar la tabla de roles.
    •Regla de Negocio: Un usuario con rol "Disertante" no puede modificar la configuración del evento (fecha/cupo), solo visualizar datos de participantes.
## 4. Restricciones Técnicas Específicas
    •Seguridad: Uso de tokens (JWT) que incluyan el role_id para validar permisos en cada petición al servidor.
    •Persistencia: Los permisos no deben estar "hardcodeados" en el código, sino consultarse en la base de datos o en un sistema de caché (Redis) para alta disponibilidad.
    •Escalabilidad: El diseño debe permitir la adición de nuevos roles (ej: "Staff de Acreditación") en el futuro sin modificar la estructura básica de la tabla de usuarios.
## 5. Modelo de Datos
    •Entidad Rol: {id, nombre_rol (string), descripcion (text), nivel_permiso (int)}.
    •Entidad Usuario (Ampliación de Spec 02): {id, ..., id_rol (FK)}.
    •Relación: Un Usuario pertenece a un Rol (1:1 en esta fase inicial).
    •Relación: Rol ↔ Funcionalidades (Muchos a Muchos para definir permisos específicos si se requiere granularidad).
## 6. Plan de Tareas
    1.Crear la tabla Roles en la base de datos e insertar los registros semilla (seeders) para Organizador, Disertante y Participante.
    2.Modificar la tabla de Usuarios para incluir la clave foránea id_rol.
    3.Implementar el Middleware de autenticación y autorización en el Backend.
    4.Desarrollar la lógica de "Protected Routes" en el Frontend para redireccionar usuarios según su rol.
    5.Crear un panel de administración simple para que el Organizador pueda cambiar roles de otros usuarios.
## 7.Estrategia de Verificación
    •Prueba de Acceso: Intentar acceder a /admin/create-event con un usuario con rol "Participante" (Debe retornar error 403 Forbidden).
    •Prueba de Asignación: Cambiar el rol de un usuario de "Participante" a "Organizador" y verificar que aparezcan las herramientas de edición.
    •Prueba de Persistencia: Cerrar sesión y volver a ingresar para asegurar que el rol se mantiene correctamente vinculado al perfil.
    •Prueba de Disertante: Verificar que el disertante pueda ver la lista de inscritos pero no pueda cambiar el cupo máximo del evento.
