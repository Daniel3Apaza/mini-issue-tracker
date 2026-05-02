const { z } = require('zod');

// Reglas para la creación y edición de proyectos
const proyectoSchema = z.object({
  nombre: z.string()
    .min(3, "El nombre del proyecto debe tener al menos 3 caracteres")
    .max(50, "El nombre es muy largo"),
    
  descripcion: z.string()
    .max(255, "La descripción no puede exceder los 255 caracteres")
    .optional() // No es obligatorio según el práctico
});

module.exports = { proyectoSchema };