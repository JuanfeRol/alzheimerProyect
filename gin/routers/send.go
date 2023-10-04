package routers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/mail"
)

func SendRouter(router *gin.Engine) {
	send := router.Group("/send")

	send.GET("/email", func(c *gin.Context) {
		ctx := appengine.NewContext(c.Request)
		addr := c.Request.FormValue("email")
		url := "https://example.com/confirmation" // replace with your confirmation URL
		msg := &mail.Message{
			Sender:  "Example.com Support <support@example.com>",
			To:      []string{addr},
			Subject: "Confirm your registration",
			Body:    fmt.Sprintf("Please confirm your registration by clicking this link: %s", url),
		}
		if err := mail.Send(ctx, msg); err != nil {
			log.Errorf(ctx, "Couldn't send email: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Couldn't send email",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Email sent",
		})
	})
}
