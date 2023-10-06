package routers

import (
	"alzheimerProject/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PublicationEndpoint(router *gin.RouterGroup, dataBase *gorm.DB) {
	router.GET("/publications", func(c *gin.Context) {
		publications, err := models.GetPublications(dataBase)

		if err != nil {
			c.JSON(504, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, publications)
	})
}
