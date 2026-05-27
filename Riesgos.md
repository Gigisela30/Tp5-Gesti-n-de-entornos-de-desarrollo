# TP4 - Análisis y Gestión de Riesgos (Framework SEI)

## 1. Inventario de activos a proteger
- Datos de eventos académicos (título, fecha, cupo, estado).
- Información personal de participantes y disertantes.
- Roles y permisos de usuarios.
- Infraestructura del servidor y base de datos.
- Integridad de las inscripciones y certificados.

## 2. Objetivos
- Garantizar continuidad del proyecto desde relevamiento hasta implantación.
- Proteger datos sensibles conforme a Ley 25.326.
- Incorporar controles OWASP en las historias de usuario.
- Reducir exposición a riesgos críticos (requerimientos, seguridad, infraestructura).

## 3. Taxonomía de riesgos
| Identificador | Elemento        | Riesgo                                  | Vinculación |
|---------------|----------       |--------                                 |-------------|
| R1            | Requerimientos  | Retraso en definición de requerimientos | Proyecto    |
| R2            | Seguridad       | Falta de experiencia del equipo en OWASP| Producto    |
| R3            | Infraestructura | Fallos en servidores on-premise         | Proyecto    |
| R4            | Recursos humanos| Rotación de integrantes del equipo      | Proyecto    |
| R5            | Integraciones   | Fallos en integración HL7 FHIR          | Producto    |

## 4. Declaración de riesgos
**R1 - Retraso en requerimientos**  
- Condición: Cliente demora en validar requerimientos.  
- Consecuencia: Atraso en cronograma.  
- Efecto: Reducción de alcance del MVP.  

**R2 - Falta de experiencia en OWASP**  
- Condición: Equipo sin capacitación en seguridad.  
- Consecuencia: Vulnerabilidades en specs y código.  
- Efecto: Riesgo de ataques (SQL Injection, Broken Access Control).  

(... repetir para R3, R4, R5)

## 5. Estimación de probabilidad e impacto
| Identificador | Riesgo                     | Probabilidad | Impacto     |Exposición|
|---------------|--------                    |--------------|---------    |----------|
| R1            | Retraso en requerimientos  | Alta (68%)   | Crítico (4) | 16       |
| R2            | Falta de experiencia OWASP | Media (40%)  | Crítico (4) | 12       |
| R3            | Fallos en servidores       | Media (40%)  | Alto (3)    | 9        |
| R4            | Rotación de equipo         | Baja (18%)   | Medio (3)   | 6        |
| R5            | Fallos en integración HL7  | Media (40%)  | Crítico (4) | 12       |

## 6. Planes de gestión
### R1 - Retraso en requerimientos
- **Acción preventiva:** reuniones semanales, checklist de requerimientos.  
- **Contingencia:** reducir alcance del MVP, priorizar funcionalidades críticas.  

### R2 - Falta de experiencia OWASP
- **Acción preventiva:** capacitación breve en OWASP Top 10, revisión de specs.  
- **Contingencia:** consultar experto externo, usar librerías seguras preexistentes.  

## 7. Enriquecimiento de historias de usuario
------------------------------------------------------------------------------------------------
En **Spec 01 - Gestión de eventos**:

Historia enriquecida:  
*“Como organizador quiero crear un evento de forma segura, de modo que los datos del evento no puedan ser alterados por usuarios no autorizados.”*  
 
Controles OWASP:  
- Validación de roles y permisos antes de crear/editar eventos.  
- Sanitización de entradas contra SQL Injection.  
- Uso obligatorio de HTTPS.  
------------------------------------------------------------------------------------------------


## 8. Conclusión
El análisis permite anticipar riesgos críticos y definir acciones concretas.  
El enriquecimiento de historias con controles OWASP fortalece la seguridad del sistema y asegura cumplimiento de buenas prácticas.



------------------------------------------------------------------------------------------------
# Análisis y Gestión de Riesgos - Spec 03: Gestión de Roles

El presente análisis de riesgo ha sido confeccionado para la plataforma de Gestión de Eventos Académicos e Institucionales. En particular, se ha optado por la evaluación del módulo transversal de control de acceso basado en roles (RBAC). El mismo ha sido confeccionado siguiendo los lineamientos de la metodología Software Risk Management (SRM) del Software Engineering Institute (SEI), es en base a esta selección que se ha estructurado el contenido del presente documento.

## 1. Introducción
La gestión de roles (Spec 03) representa el perímetro de seguridad lógico de la aplicación. Un fallo en el aislamiento de privilegios o en la validación de tokens expone directamente la integridad de los datos de eventos y registros de usuarios.

### Inventario de activos a proteger
*   **Activos de Información:** Tokens de autenticación (JWT), base de datos de asignación de permisos (RBAC), datos sensibles de usuarios e inscritos.
*   **Activos de Software:** Middleware de autorización del Backend, lógica de rutas protegidas (*Protected Routes*) en el Frontend.
*   **Activos de Procesos:** Flujo de escalado de permisos (ascender participantes a disertantes/co-organizadores).

### Objetivos
*   Garantizar que ningún usuario pueda realizar acciones que no correspondan a su perfil asignado (Organizador, Disertante, Participante).
*   Blindar las rutas de la API contra ataques de escalación de privilegios verticales y horizontales mediante controles basados en estándares OWASP.

---

## 2. Taxonomía de los Riesgos

| Identificador | Elemento | Riesgo | Vinculación del riesgo |
| :--- | :--- | :--- | :--- |
| **R1** | Token / Sesión | **Secuestro de Objetivos del Agente / Token Hijacking (ASI01/OWASP):** Fuga o intercepción de JWT que permite la suplantación de la identidad del Organizador. | Producto / Proyecto |
| **R2** | Middleware de Rutas | **Abuso de Privilegios por Falla de Validación (ASI03):** El Middleware falla en verificar el `role_id` en el Backend, permitiendo peticiones directas no autorizadas a rutas críticas. | Producto |
| **R3** | Panel de Administración | **Escalación de Privilegios Horizontal:** Un Participante manipula los parámetros de la petición de actualización de perfil para auto-ascenderse a Organizador. | Producto / Negocio |
| **R4** | Base de Datos / Caché | **Pérdida de Disponibilidad del Almacén de Roles:** Caída del servidor de persistencia o sistema de caché (Redis), provocando la inaccesibilidad global a los permisos del sistema. | Producto |
| **R5** | Interfaz Adaptable | **Inconsistencia Visual y Fuga Operativa:** Botones administrativos expuestos visualmente a roles incorrectos por fallas en el renderizado condicional del Frontend. | Producto |

---

## 3. Declaración de los Riesgos

*   **R1:** 
    *   **Condición:** Almacenamiento inseguro de JWT en el Frontend o falta de cifrado en tránsito.
    *   **Consecuencia:** Intercepción de credenciales activas por atacantes externos.
    *   **Efecto:** Pérdida total de confidencialidad, acceso no autorizado a datos institucionales y modificación maliciosa de eventos.
*   **R2:** 
    *   **Condición:** Confianza excesiva en los filtros de seguridad del Frontend sin validación simétrica en el Backend.
    *   **Consecuencia:** Ejecución de comandos administrativos remotos mediante herramientas de testing de API (Postman/Curl).
    *   **Efecto:** Alteración de la base de datos de usuarios y eliminación de registros de eventos críticos.
*   **R3:** 
    *   **Condición:** Ausencia de controles estrictos de propiedad y autorización en el endpoint de asignación de roles.
    *   **Consecuencia:** Asignación indebida de roles de Organizador o Disertante por parte de usuarios comunes.
    *   **Efecto:** Violación de las reglas de negocio establecidas y pérdida de control administrativo del sistema.

---

## 4. Estimación de la Probabilidad

### Tabla de Referencia de Probabilidad
| Rango de probabilidad | Promedio para el cálculo | Expresión de lenguaje natural | Valor numérico |
| :--- | :--- | :--- | :--- |
| de 1% a 10% | 5% | Baja | 1 |
| de 11% a 25% | 18% | Poco probable | 2 |
| de 26% a 55% | 40% | Media | 3 |
| de 56% a 80% | 68% | Altamente probable | 4 |
| de 81% a 99% | 90% | Casi seguro | 5 |

### Estimación de probabilidad para cada riesgo:
| Identificador | Elemento | Expresión | Probabilidad (Valor) |
| :--- | :--- | :--- | :--- |
| **R1** | Token / Sesión | Media | 3 |
| **R2** | Middleware de Rutas | Poco probable | 2 |
| **R3** | Panel de Administración | Poco probable | 2 |
| **R4** | Base de Datos / Caché | Baja | 1 |
| **R5** | Interfaz Adaptable | Media | 3 |

---

## 5. Estimación del Impacto

### Tabla de Referencia de Impacto
| Criterio | Período en el que el proyecto se verá afectado | Valor numérico |
| :--- | :--- | :--- |
| Insignificante | Menos de 24 horas (sin afectación de datos) | 1 |
| Marginal | De 1 a 3 días (afectación visual menor) | 2 |
| Medio | De 3 a 7 días (re-trabajo en módulos aislados) | 3 |
| Crítico | Más de 1 semana (corrupción parcial de base de datos) | 4 |
| Catastrófico | Parálisis total del proyecto / Sanciones legales graves | 5 |

### Estimación del impacto para cada riesgo:
| Identificador | Riesgo | Impacto |
| :--- | :--- | :--- |
| **R1** | Secuestro de Objetivos del Agente / Token Hijacking | Catastrófico (5) |
| **R2** | Abuso de Privilegios por Falla de Validación | Crítico (4) |
| **R3** | Escalación de Privilegios Horizontal | Medio (3) |
| **R4** | Pérdida de Disponibilidad del Almacén de Roles | Crítico (4) |
| **R5** | Inconsistencia Visual y Fuga Operativa | Marginal (2) |

---

## 6. Magnitud de Exposición al Riesgo

Umbrales: 1 = Bajo riesgo | 2 a 3 = Riesgo medio | 4 a 5 = Alto riesgo.

| Identificador | Riesgo | Impacto | Probabilidad | Exposición (I * P) |
| :--- | :--- | :--- | :--- | :--- |
| **R1** | Secuestro de Objetivos / Token Hijacking | 5 | 3 | **15 (Alto Riesgo)** |
| **R2** | Abuso de Privilegios en Middleware | 4 | 2 | **8 (Alto Riesgo)** |
| **R3** | Escalación de Privilegios Horizontal | 3 | 2 | **6 (Riesgo Medio)** |
| **R4** | Pérdida de Disponibilidad del Almacén de Roles | 4 | 1 | **4 (Riesgo Medio)** |
| **R5** | Inconsistencia Visual y Fuga Operativa | 2 | 3 | **6 (Riesgo Medio)** |

---

## 7. Planes de Gestión de los Riesgos

La gestión de los riesgos se reconoce como un proceso continuo, por lo que el presente documento podría ser adaptado a medida que se avanza con su ejecución. Se presentan los planes de acción (preventivos) and de contingencias (reactivos) para los riesgos cuya exposición fuera superior a los umbrales definidos.

### Gestión de R1 (Token Hijacking / Secuestro de Objetivos)
*   **Importancia del riesgo:** Crítica. Compromete la identidad de los administradores y la seguridad de todos los módulos asociados.
*   **Información requerida para su seguimiento:** Logs de auditoría de generación de tokens, reportes de IPs anómalas en inicios de sesión.
*   **Responsable:** Arquitecto de Seguridad / Desarrollador Backend.
*   **Recursos necesarios:** Librerías de cifrado, entorno de pruebas para tokens expirados.

#### 1.1. Plan de acción (Mitigación/Prevención)
*   **1.1.1.** Implementar la cookie `HttpOnly` y `Secure` para el almacenamiento del JWT en el cliente, evitando su lectura mediante scripts maliciosos (XSS).
*   **1.1.2.** Configurar un tiempo de expiración corto para los tokens de acceso (máximo 15 minutos) e implementar tokens de refresco (*Refresh Tokens*) rotativos.

#### 1.2. Plan de contingencias
*   **Disparador:** Detección de múltiples accesos concurrentes con el mismo token desde diferentes ubicaciones geográficas o reporte manual de suplantación.
*   **1.2.1.** Ejecución de un script automatizado de invalidación masiva de sesiones activas en el almacén de caché (Redis) para el usuario afectado.
*   **1.2.2.** Activación temporal de bloqueo de cuenta y solicitud forzada de re-autenticación multifactor (2FA) en el próximo login.

---

### Gestión de R2 (Abuso de Privilegios / Falla en Middleware)
*   **Importancia del riesgo:** Alta. Evita que usuarios con rol de Participante ejecuten acciones destructivas de Organizadores (ej: borrar eventos).
*   **Información requerida para su seguimiento:** Pruebas automatizadas de integración en el pipeline de CI/CD, registros de errores 403 en el servidor.
*   **Responsable:** Desarrollador Backend Principal.
*   **Recursos necesarios:** Framework de testing (Jest/PyTest), Middleware centralizado de control de acceso.

#### 2.1. Plan de acción (Mitigación/Prevención)
*   **2.1.1.** Aplicar el principio de Mínima Agencia (Least Agency): aislar por completo las consultas a nivel de ruta en el servidor e inyectar el control de acceso en cada petición HTTP de forma mandatoria.
*   **2.1.2.** Escribir pruebas unitarias automatizadas que simulen llamadas de usuarios sin permisos a endpoints protegidos (ej. `/api/admin/delete-event`) asegurando que devuelvan estrictamente el código HTTP 403.

#### 2.2. Plan de contingencias
*   **Disparador:** Registro en los logs de una llamada exitosa (HTTP 200) a un endpoint crítico por parte de un usuario con rol no autorizado.
*   **2.2.1.** Apagar de manera inmediata el endpoint afectado (mantenimiento temporal del módulo) mediante variables de entorno (*Feature Flags*).
*   **2.2.2.** Auditoría forense de la base de datos de auditoría inalterable para revertir cualquier cambio no autorizado realizado durante la brecha antes de levantar el servicio nuevamente.

---

## 7. Enriquecimiento de historias de usuario

En **Spec 03 - Gestión de Roles**:

Historia enriquecida:  
*“Como administrador u organizador, quiero cambiar el rol de un usuario de forma segura, de modo que los permisos de acceso no puedan ser manipulados ni escalados por usuarios no autorizados.”*  
 
Controles OWASP:  
- Validación estricta de roles y permisos en el servidor mediante Middleware de autorización antes de impactar cambios.  
- Uso de tokens (JWT) firmados criptográficamente que incluyan el role_id de forma inmutable.  
- Registro y auditoría inalterable (Logs) de todos los intentos de modificación de privilegios.  
------------------------------------------------------------------------------------------------

## 8. Conclusión
El análisis permite anticipar riesgos críticos y definir acciones concretas.  
El enriquecimiento de historias con controles OWASP fortalece la seguridad del sistema y asegura cumplimiento de buenas prácticas.

------------------------------------------------------------------------------------------------
#  Análisis y Gestión de Riesgos - Spec 05: Emisión de certificados

El presente análisis de riesgo ha sido confeccionado para la **Institución Académica Organizadora**. En particular, se ha optado por la evaluación de los **mecanismos de seguridad y validación de la Spec 05: Emisión de Certificados**. El mismo ha sido confeccionado siguiendo los lineamientos de la metodología Software Risk Management (SRM) del Software Engineering Institute (SEI), es en base a esta selección que se ha estructurado el contenido del presente documento.

Este documento evalúa los riesgos críticos que afectan tanto a los recursos humanos como a los materiales del proyecto, abarcando todo el ciclo de vida del software, desde el relevamiento de requerimientos hasta la implantación.

### Inventario de activos a proteger
* **Activos de Información:** Base de datos de validación de códigos únicos, certificados PDF almacenados, hashes de integridad criptográfica.
* **Activos de Software:** Servicio de generación dinámica de PDF (Puppeteer), portal de validación pública, worker de envío de correos por email.
* **Activos de Procesos:** Flujo de firma digital e inmutabilidad del código de verificación.

### Objetivos
* Garantizar que solo los participantes legítimamente acreditados reciban certificados auténticos e inalterables.
* Asegurar la disponibilidad absoluta del portal de validación y la entrega efectiva de los documentos por correo electrónico.

### Equipo de trabajo
* **[Tu Nombre / Participante del Grupo]** – Analista de Riesgos y Seguridad

---

## Taxonomía de los riesgos

| Identificador | Elemento | Riesgo | Vinculación del riesgo |
| :--- | :--- | :--- | :--- |
| **R1** | Firma Digital / Hash | **Falsificación de Documentos:** Alteración del PDF o del código de verificación sin detección por parte del sistema. | Producto |
| **R2** | Portal de Validación | **Enumeración de Certificados (OWASP A04):** Ataques de fuerza bruta para descubrir códigos de verificación válidos en el portal público. | Producto |
| **R3** | Puppeteer / PDF | **Denegación de Servicio (DoS):** Consumo excesivo de recursos del servidor durante la generación masiva de PDFs concurrentes. | Producto |
| **R4** | Worker de Correo | **Bloqueo por SPAM:** Los certificados no llegan a destino debido a una mala reputación del servidor de envío. | Proyecto |
| **R5** | Almacenamiento (S3) | **Acceso no Autorizado a Repositorio:** Filtración de certificados almacenados por configuraciones de permisos incorrectas. | Producto / Negocio |

---

## Declaración de los riesgos

* **R2 - Portal de Validación:**
    * **Condición:** Si el buscador público de códigos carece de límites de peticiones (Rate Limiting) y usa identificadores predecibles o secuenciales...
    * **Consecuencia:** ...entonces usuarios o bots maliciosos podrán adivinar los códigos e interceptar documentos ajenos de forma masiva.
    * **Efecto:** Violación de la privacidad de los datos de los participantes y riesgo inminente de fraude masivo.
* **R3 - Puppeteer / PDF:**
    * **Condición:** Si la compilación dinámica de las plantillas HTML a PDF se ejecuta de manera síncrona en el hilo principal del servidor bajo alta demanda...
    * **Consecuencia:** ...entonces el sistema superará los límites de tiempo de respuesta provocando caídas del servicio web.
    * **Efecto:** Inoperatividad total del sistema durante el cierre de eventos multitudinarios.

---

## Efecto

### Estimación de la probabilidad

| Rango de probabilidad | Promedio para el cálculo | Expresión de lenguaje natural | Valor numérico |
| :--- | :--- | :--- | :--- |
| de 1% a 10% | 5% | Baja | 1 |
| de 11% a 25% | 18% | Poco probable | 2 |
| de 26% a 55% | 40% | Media | 3 |
| de 56% a 80% | 68% | Altamente probable | 4 |
| de 81% a 99% | 90% | Casi seguro | 5 |

### Estimación de probabilidad para cada riesgo:

| Identificador | Elemento | Expresión | Probabilidad |
| :--- | :--- | :--- | :--- |
| **R1** | Firma Digital / Hash | Baja | 1 |
| **R2** | Portal de Validación | Media | 3 |
| **R3** | Puppeteer / PDF | Altamente probable | 4 |
| **R4** | Worker de Correo | Poco probable | 2 |
| **R5** | Almacenamiento (S3) | Baja | 1 |

## Estimación del Impacto 

### Tabla de Referencia de Impacto 
| Criterio | Período en el que el proyecto se verá afectado | Valor numérico |
| :--- | :--- | :--- |
| Insignificante | Menos de 24 horas (sin afectación de datos) | 1 |
| Marginal | De 1 a 3 días (afectación visual menor) | 2 |
| Medio | De 3 a 7 días (re-trabajo en módulos aislados) | 3 |
| Crítico | Más de 1 semana (corrupción parcial de base de datos) | 4 |
| Catastrófico | Parálisis total del proyecto / Sanciones legales graves | 5 |

### Estimación del impacto

### Estimación del impacto para cada riesgo

| Identificador | Riesgo | Impacto |
| :--- | :--- | :--- |
| **R1** | Falsificación de Documentos | Catastrófico (5) |
| **R2** | Enumeración de Certificados | Crítico (4) |
| **R3** | Denegación de Servicio (DoS) | Crítico (4) |
| **R4** | Bloqueo por SPAM | Medio (3) |
| **R5** | Acceso no Autorizado a Repositorio | Crítico (4) |

---

## Magnitud de exposición al riesgo

Umbrales: 1 = Bajo riesgo | 2 a 3 = Riesgo medio | 4 a 5 = Alto riesgo.

| Identificado | Riesgo | Impacto | Probabilidad | Exposición |
| :--- | :--- | :--- | :--- | :--- |
| **R3** | Denegación de Servicio (DoS) | 4 | 4 | **16 (Alto Riesgo)** |
| **R2** | Enumeración de Certificados | 4 | 3 | **12 (Alto Riesgo)** |
| **R1** | Falsificación de Documentos | 5 | 1 | **5 (Riesgo Medio)** |
| **R5** | Acceso no Autorizado a Repositorio | 4 | 1 | **4 (Riesgo Medio)** |
| **R4** | Bloqueo por SPAM | 3 | 2 | **6 (Riesgo Medio)** |

---

## Planes de gestión de los riesgos

La gestión de los riesgos se reconoce como un proceso continuo, por lo que el presente documento podría ser adaptado a medida que se avanza con su ejecución.

Se presentan los planes de acción (preventivos) y de contingencias (reactivos) para los riesgos cuya exposición fuera superior a los umbrales definidos en el análisis precedente.

### 1. R3 - Denegación de Servicio (DoS) en Generación de PDF

| Descripción de aspectos principales del riesgo | Importancia | Alta. Evita que el servidor colapse por picos de procesamiento al finalizar un evento. |
| :--- | :--- | :--- |
| | **Información requerida para su seguimiento** | Logs de consumo de CPU/Memoria, tamaño de la cola del worker y tasa de timeouts. |
| | **Responsable** | Arquitecto de Software / DevOps. |
| | **Recursos necesarios** | Servidor de mensajería (Redis), entorno aislado para workers en la nube. |

#### 1.1. Plan de acción
* **1.1.1.** Aislar por completo el motor de conversión HTML a PDF (Puppeteer) del hilo de ejecución principal de la aplicación web.
* **1.1.2.** Implementar una cola de tareas distribuidas asíncronas para dosificar y encolar las solicitudes masivas de certificados.

#### 1.2. Plan de contingencias
* **Disparador:** Las alertas del sistema registran tiempos de respuesta de la API superiores a los 10 segundos de forma sostenida.
* **1.2.1.** Apagar de manera temporal la descarga instantánea en el navegador web por parte de los usuarios.
* **1.2.2.** Habilitar el flujo alternativo de generación diferida en segundo plano, notificando al participante por correo electrónico una vez su archivo esté procesado y subido de forma segura.

---

### 2. R2 - Enumeración de Certificados en el Portal de Validación

| Descripción de aspectos principales del riesgo | Importancia | Crítica. Protege la privacidad de los datos de los usuarios e impide la descarga masiva ilícita. |
| :--- | :--- | :--- |
| | **Información requerida para su seguimiento** | Registro inalterable de búsquedas fallidas, IPs con peticiones anómalas concurrentes. |
| | **Responsable** | Desarrollador Backend Principal / Especialista en AppSec. |
| | **Recursos necesarios** | Módulo de middleware para Rate Limiting, generador criptográfico CSPRNG. |

#### 2.1. Plan de acción
* **2.1.1.** Modificar los criterios de aceptación e implementar controles OWASP de sanitización estricta de variables y Rate Limiting en el portal público.
* **2.1.2.** Cambiar la regla de negocio para que el código único inmutable deje de ser secuencial y pase a ser un string aleatorio complejo criptográficamente seguro.

#### 2.2. Plan de contingencias
* **Disparador:** Detección en los logs de más de 50 peticiones de validación fallidas originadas desde una misma dirección IP en menos de 1 minuto.
* **2.2.1.** Ejecutar el bloqueo automatizado de la IP sospechosa mediante reglas activas del Firewall.
* **2.2.2.** Activar un sistema de verificación visual (CAPTCHA) obligatorio en el endpoint de búsqueda antes de procesar nuevas consultas en la base de datos.

---

## 7. Enriquecimiento de historias de usuario


En **Spec 05 - Emision de certificados**:

Historia enriquecida:

“Como participante y administrador, quiero que la generación, envío y validación pública de certificados se realicen bajo entornos seguros y controlados, de modo que se garantice la integridad de los documentos y se eviten fraudes o caídas del servicio por alta demanda.”

Controles OWASP:
- Restricción perimetral mediante un límite estricto de peticiones (Rate Limiting) al buscador público para bloquear ataques automatizados de enumeración de códigos por fuerza bruta.
- Sanitización y parametrización mandatoria de los campos de entrada de texto del portal de validación para repeler ataques de inyección SQL.
- Ejecución del servicio de Puppeteer dentro de un ambiente restringido (Sandbox) y desacoplado mediante colas de tareas asíncronas para evitar la denegación de servicio (DoS) y escaladas de permisos.

----------

## 8. Conclusión
El análisis permite anticipar riesgos críticos en el módulo de certificados y definir acciones concretas de mitigación. El enriquecimiento de historias con controles OWASP fortalece la seguridad del sistema y asegura el cumplimiento de buenas práctica.