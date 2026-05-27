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
