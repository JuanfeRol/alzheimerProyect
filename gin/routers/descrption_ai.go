package routers

import (
	"alzheimerProject/models"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

// Funcion encargada de generar "description"
func GenerateDescription(abs string) (des string, err error) {
	client := openai.NewClient("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")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Summarize this medical text on Alzheimer's disease in 50 words. Highlight the essential information, emphasizing key aspects such as symptoms, risk factors, and potential treatments. Maintain coherence and precision in your summary, capturing the most significant elements of the text, dont start with 'this text' or any similar, take advantage of every word:" + abs,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	des = resp.Choices[0].Message.Content

	fmt.Print(resp.Choices[0].Message.Content)

	return des, nil

}

func ChatgptEndpoint(router *gin.RouterGroup, dataBase *gorm.DB) {
	send := router.Group("/use")

	send.GET("/chatgpt", func(c *gin.Context) {
		// Obtener la lista de publicaciones
		publications, err := models.GetPublications(dataBase)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Error",
			})
			return
		}

		//Recorre todas las publicaciones y determina cuales no tienen "Description"
		for i := range *publications {
			if (*publications)[i].Description == "" {
				//Si no existe "description" se generara, caso contrario busca en el siguiente campo
				description, err := GenerateDescription((*publications)[i].Abstract)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{
						"message": "Error generating description",
					})
					return
				}
				(*publications)[i].Description = description
				//Actualiza la base datos en la columna "Description"
				models.UpdatePublication(dataBase, (*publications)[i])
			}

		}

		c.JSON(http.StatusOK, gin.H{
			"message":      "Descripciones generadas con éxito",
			"publications": publications,
		})

	})
}
