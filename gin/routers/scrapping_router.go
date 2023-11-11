package routers

import (
	"alzheimerProject/models"
	"alzheimerProject/utils"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ScrappingEndpoint(router *gin.RouterGroup, dataBase *gorm.DB) {
	send := router.Group("/use")

	send.GET("/scrapper", func(c *gin.Context) {
		// List of publications
		publication := models.Publication{}

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
			title := element.Find(".docsum-title").Text() // obtener string
			title = utils.CleanString(title, false)       // limpiarla
			title = strings.TrimSpace(title)              // quitarle espacios iniciales y finales
			link, _ := element.Find(".docsum-title").Attr("href")

			// Imprime los datos extraídos
			fmt.Printf("Título: %s\n", title)
			fmt.Printf("Enlace: https://pubmed.ncbi.nlm.nih.gov%s\n", link)

			publication.Title = title

			// Content into the link
			link = "https://pubmed.ncbi.nlm.nih.gov" + link
			response, err := http.Get(link)
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

			// Encuentra los DOI
			found := false
			document.Find(".doi").Each(func(index int, element *goquery.Selection) {
				if found {
					return
				}

				// Extrae el título y el enlace de cada resultado
				doi := element.Find(".id-link").Text()
				doi = utils.CleanString(doi, true)

				if doi == "" {
					return
				}

				linkToDOI := strings.ToLower(doi)
				linkToDOI = utils.CleanString(linkToDOI, true)

				// Imprime los datos extraídos
				fmt.Printf("El DOI es: %s\n", doi)
				fmt.Printf("Enlace al DOI: https://doi.org/%s\n", linkToDOI)

				publication.DOI = doi
				publication.DOILink = "https://doi.org/" + linkToDOI

				found = true
			})

			// Encuentra los elementos HTML que contienen los datos que deseas extraer
			document.Find("#abstract").Each(func(index int, element *goquery.Selection) {
				// Extrae el título y el enlace de cada resultado
				abstract := element.Find(".abstract-content").Text()
				abstract = utils.CleanString(abstract, false)
				abstract = strings.TrimSpace(abstract)

				exist := element.Find(".empty-abstract").Text()

				if exist != "" { // si no existe el abstract
					abstract = "No abstract, visit the DOI link" // to-do: visitar el link del DOI y descargar el abstract o info
				}

				// Imprime los datos extraídos
				fmt.Printf("Abstract: %s\n", abstract)

				publication.Abstract = abstract

				publication.Body = "Title: " + publication.Title + "\n\nDOI: " + publication.DOI + "\n\nAbstract: " + publication.Abstract + "\n\nVisit the link for more information: " + publication.DOILink

				models.CreatePublication(dataBase, publication)
			})

			fmt.Println("-----")
		})

		c.JSON(http.StatusOK, gin.H{
			"message": "Scrapping done!",
		})
	})
}
