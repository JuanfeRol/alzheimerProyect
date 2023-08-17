package routers

import "github.com/gin-gonic/gin"

func SendRouter(router *gin.Engine) {
	send := router.Group("/send")

	send.GET("/email", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "email",
		})
	})
}
