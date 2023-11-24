package routers

import (
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(dataBase *gorm.DB) *gin.Engine {
	// Se crea el framework Gin
	router := gin.Default()

	// Cors
	router.Use(corsMiddleware())

	// Se define el frontend
	router.Use(static.Serve("/", static.LocalFile("./templates", true)))

	// Se define el grupo de rutas
	api := router.Group("/api")

	// Se llaman las rutas
	UserEndpoint(api, dataBase)
	MailEndpoint(api, dataBase)
	ScrappingEndpoint(api, dataBase)
	PublicationEndpoint(api, dataBase)
	ChatgptEndpoint(api, dataBase)

	// Retorna Gin
	return router
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
