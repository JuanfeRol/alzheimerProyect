package routers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/mail"
)

func SendRouter(router *gin.Engine) {
	send := router.Group("/send")

	send.GET("/email", func(c *gin.Context) {
		ctx := appengine.NewContext(r)
		addr := r.FormValue("email")
		url := createConfirmationURL(r)
		msg := &mail.Message{
			Sender:  "Example.com Support <support@example.com>",
			To:      []string{addr},
			Subject: "Confirm your registration",
			Body:    fmt.Sprintf(confirmMessage, url),
		}
		if err := mail.Send(ctx, msg); err != nil {
			log.Errorf(ctx, "Couldn't send email: %v", err)
		}
		c.JSON(200, gin.H{
			"message": "email",
		})
	})
}
