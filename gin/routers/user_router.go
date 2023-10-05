package routers

import (
	"alzheimerProject/controllers"
	"alzheimerProject/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UserEndpoint(api *gin.RouterGroup, dataBase *gorm.DB) {
	api.POST("/create-user", controllers.CreateUserHandler(services.CreateUser, dataBase))
	api.GET("/user/:id", controllers.GetUserHandler(services.GetUserByID, dataBase))
	api.PUT("/user/:id", controllers.UpdateUserHandler(services.UpdateUser, dataBase))
	api.DELETE("/user/:id", controllers.DeleteUserHandler(services.DeleteUser, dataBase))
}
