package services

import (
	"net/http"

	"alzheimerProject/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetUserByID obtiene un usuario por su ID
func GetUserByID(c *gin.Context, db *gorm.DB, userID uint64) {
	var user models.User
	result := db.First(&user, userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// Login verifica las credenciales solo email y password
func Login(c *gin.Context, db *gorm.DB, userEmail string, userPassword string) {
	var user models.User
	result := db.Where("email = ?", userEmail).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if !user.CheckPassword(userPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// cookie := http.Cookie{
	// 	Name:     "user",
	// 	Value:    user.Name,
	// 	MaxAge:   3600,
	// 	Path:     "/",
	// 	Domain:   "localhost",
	// 	Secure:   false,
	// 	HttpOnly: false,
	// 	SameSite: http.SameSiteLaxMode,
	// }

	// http.SetCookie(c.Writer, &cookie)
	c.SetCookie("user", user.Name, 3600, "/", "", false, true)
	// log.Println("Cookie", c.Request.Cookies())
	// log.Println("Cookie", c.Request.Header.Get("Cookie"))
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// CreateUser crea un nuevo usuario
func CreateUser(c *gin.Context, db *gorm.DB) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := newUser.SetPassword(newUser.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	result := db.Create(&newUser)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	newUser.Password = ""

	c.JSON(http.StatusOK, gin.H{"data": newUser})
}

// UpdateUser actualiza un usuario existente
func UpdateUser(c *gin.Context, db *gorm.DB, userID uint64) {
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

	if err := user.SetPassword(user.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	result = db.Save(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DeleteUser elimina un usuario por su ID
func DeleteUser(c *gin.Context, db *gorm.DB, userID uint64) {
	result := db.Delete(&models.User{}, userID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
