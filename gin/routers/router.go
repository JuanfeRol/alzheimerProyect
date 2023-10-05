package routers

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(dataBase *gorm.DB) *gin.Engine {
	// Se crea el framework Gin
	router := gin.Default()

	// Se define el frontend
	router.Use(static.Serve("/", static.LocalFile("./templates", true)))

	// Se define el grupo de rutas
	api := router.Group("/api")

	// Se llaman las rutas
	UserEndpoint(api, dataBase)
	MailEndpoint(api, dataBase)
	ScrappingEndpoint(api, dataBase)

	// Retorna Gin
	return router
}
