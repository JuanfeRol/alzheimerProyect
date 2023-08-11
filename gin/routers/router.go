package routers

import (
	"alzheimerProject/controllers"
	"alzheimerProject/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(dataBase *gorm.DB) *gin.Engine {
	// Se crea el framework Gin
	router := gin.Default()

	// Se define la ruta con su respectivo controlador y servicio
	router.POST("/create-user", controllers.CreateUserHandler(services.CreateUser, dataBase))
	router.GET("/user/:id", controllers.GetUserHandler(services.GetUserByID, dataBase))
	router.PUT("/user/:id", controllers.UpdateUserHandler(services.UpdateUser, dataBase))
	router.DELETE("/user/:id", controllers.DeleteUserHandler(services.DeleteUser, dataBase))

	// Retorna Gin
	return router
}
