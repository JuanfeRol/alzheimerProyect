package services

import (
	"net/http"

	"alzheimerProject/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetUserByID obtiene un usuario por su ID
func GetUserByID(c *gin.Context, db *gorm.DB, userID int64) {
	var user models.User
	result := db.First(&user, userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// CreateUser crea un nuevo usuario
func CreateUser(c *gin.Context, db *gorm.DB) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := db.Create(&newUser)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newUser})
}

// UpdateUser actualiza un usuario existente
func UpdateUser(c *gin.Context, db *gorm.DB, userID int64) {
	var user models.User
	result := db.First(&user, userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result = db.Save(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DeleteUser elimina un usuario por su ID
func DeleteUser(c *gin.Context, db *gorm.DB, userID int64) {
	result := db.Delete(&models.User{}, userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
