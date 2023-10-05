package routers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ScrappingEndpoint(router *gin.RouterGroup, dataBase *gorm.DB) {
	send := router.Group("/use")

	send.GET("/scrapper", func(c *gin.Context) {
		// URL de PubMed que deseas analizar
		url := "https://pubmed.ncbi.nlm.nih.gov/?term=alzheimer&sort=date"

		// Realiza una solicitud HTTP GET a la URL
		response, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}
		defer response.Body.Close()

		if response.StatusCode != 200 {
			log.Fatalf("Error: El servidor respondió con un código de estado %d", response.StatusCode)
		}

		// Crea un objeto goquery.Document a partir del contenido HTML
		document, err := goquery.NewDocumentFromReader(response.Body)
		if err != nil {
			log.Fatal(err)
		}

		// Encuentra los elementos HTML que contienen los datos que deseas extraer
		document.Find(".docsum-content").Each(func(index int, element *goquery.Selection) {
			// Extrae el título y el enlace de cada resultado
			title := element.Find(".docsum-title").Text()
			link, _ := element.Find(".docsum-title a").Attr("href")

			// Imprime los datos extraídos
			fmt.Printf("Título: %s\n", title)
			fmt.Printf("Enlace: https://pubmed.ncbi.nlm.nih.gov%s\n", link)
			fmt.Println("-----")
		})

		c.JSON(http.StatusOK, gin.H{
			"message": "Email sent",
		})
	})
}
