package routers

import (
	"alzheimerProject/models"
	"crypto/tls"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func MailEndpoint(router *gin.RouterGroup, dataBase *gorm.DB) {
	send := router.Group("/send")

	send.GET("/email", func(c *gin.Context) {
		// Se inicializan las variables de entorno
		SMTP_PASS := os.Getenv("SMTP_PASS")
		SMTP_ACC := os.Getenv("SMTP_ACC")

		// Configura los datos de autenticación SMTP de IONOS
		smtpServer := "smtp.ionos.mx"
		smtpUser := SMTP_ACC
		smtpPassword := SMTP_PASS

		// Configura el mensaje de correo
		to := []string{SMTP_ACC}
		subject := "Correo de prueba desde Go"
		message := "Este es un mensaje de prueba enviado desde Go."

		// Crea el cuerpo del mensaje
		body := "To: " + to[0] + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"\r\n" + message

		// Autentica con el servidor SMTP de IONOS
		auth := smtp.PlainAuth("", smtpUser, smtpPassword, smtpServer)

		tls := &tls.Config{
			InsecureSkipVerify: true,
			ServerName:         smtpServer,
		}

		// Conecta al servidor SMTP
		client, err := smtp.Dial(smtpServer + ":587")
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación SMTP
		err = client.Hello("localhost")
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación TLS
		err = client.StartTLS(tls)
		if err != nil {
			log.Println(err)
		}

		// Autentica con el servidor SMTP
		err = client.Auth(auth)
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación SMTP
		err = client.Mail(smtpUser)
		if err != nil {
			log.Println(err)
		}

		for _, recipient := range to {
			err := client.Rcpt(recipient)
			if err != nil {
				log.Println(err)
			}
		}

		// Prepara el cuerpo del mensaje
		wc, err := client.Data()
		if err != nil {
			log.Println(err)
		}
		_, err = wc.Write([]byte(body))
		if err != nil {
			log.Println(err)
		}
		err = wc.Close()
		if err != nil {
			log.Println(err)
		}

		// Cierra la conexión SMTP
		err = client.Quit()
		if err != nil {
			log.Println(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Email sent",
		})
	})

	send.GET("/publications", func(c *gin.Context) {
		// Get the last publication
		publication, err := models.GetLastPublication(dataBase)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error",
			})
		}

		// Se inicializan las variables de entorno
		SMTP_PASS := os.Getenv("SMTP_PASS")
		SMTP_ACC := os.Getenv("SMTP_ACC")

		// Configura los datos de autenticación SMTP de IONOS
		smtpServer := "smtp.ionos.mx"
		smtpUser := SMTP_ACC
		smtpPassword := SMTP_PASS

		// Obtiene todos los usuarios
		var users []models.User
		result := dataBase.Find(&users)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		// Crea un mapa de correos de los usuarios
		var emails []string

		for _, user := range users {
			emails = append(emails, user.Email)
		}

		// Configura el mensaje de correo
		from := SMTP_ACC
		to := emails
		subject := "New Alzheimer's publication!"
		message := publication.Description

		// Crea el cuerpo del mensaje
		body := "From: " + from + "\r\n" +
			"To: " + to[0] + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"\r\n" + message

		// Autentica con el servidor SMTP de IONOS
		auth := smtp.PlainAuth("", smtpUser, smtpPassword, smtpServer)

		tls := &tls.Config{
			InsecureSkipVerify: true,
			ServerName:         smtpServer,
		}

		// Conecta al servidor SMTP
		client, err := smtp.Dial(smtpServer + ":587")
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación SMTP
		err = client.Hello("localhost")
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación TLS
		err = client.StartTLS(tls)
		if err != nil {
			log.Println(err)
		}

		// Autentica con el servidor SMTP
		err = client.Auth(auth)
		if err != nil {
			log.Println(err)
		}

		// Inicia la conversación SMTP
		err = client.Mail(smtpUser)
		if err != nil {
			log.Println(err)
		}

		for _, recipient := range to {
			err := client.Rcpt(recipient)
			if err != nil {
				log.Println(err)
			}
		}

		// Prepara el cuerpo del mensaje
		wc, err := client.Data()
		if err != nil {
			log.Println(err)
		}
		_, err = wc.Write([]byte(body))
		if err != nil {
			log.Println(err)
		}
		err = wc.Close()
		if err != nil {
			log.Println(err)
		}

		// Cierra la conexión SMTP
		err = client.Quit()
		if err != nil {
			log.Println(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Email sent",
		})
	})
}
