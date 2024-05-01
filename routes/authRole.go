package routes

import (
	"context"
)

func getUserRoleFromContext(ctx context.Context) string {
	// Suponiendo que el rol del usuario está almacenado en el contexto bajo la clave "userRole"
	// Puedes ajustar esto según cómo estés manejando los roles en tu aplicación

	if role, ok := ctx.Value("userRole").(string); ok {
		return role
	}

	// Si no se encuentra el rol en el contexto, retorna un valor por defecto o un valor vacío
	return ""
}
