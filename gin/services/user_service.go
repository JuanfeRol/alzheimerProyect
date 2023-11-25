package services

import (
	"encoding/json"
	"net/http"
	"strconv"

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

	type UserToSend struct {
		ID       uint64 `json:"id"`
		Name     string `json:"name"`
		LastName string `json:"lastName"`
		Email    string `json:"email"`
	}

	userToSend := UserToSend{
		ID:       uint64(user.ID),
		Name:     user.Name,
		LastName: user.LastName,
		Email:    user.Email,
	}

	jsonUserToSend, err := json.Marshal(userToSend)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	cookie := http.Cookie{
		Name:     "user",
		Value:    strconv.Itoa(int(user.ID)), // se debe usar un token en lugar del ID, pues el token almacenará el ID, el nombre, el apellido y el perfil del usuario
		MaxAge:   3600,
		Path:     "/",
		Domain:   "",
		Secure:   false,                // se deben usar certificados SSL
		HttpOnly: false,                // false para acceder a document.cookie
		SameSite: http.SameSiteLaxMode, // SameSiteNoneMode solo se puede usar con Secure=true
	}

	http.SetCookie(c.Writer, &cookie)
	// c.SetCookie("user", user.Name, 3600, "/", "", false, true)
	// log.Println("Cookie", c.Request.Cookies())
	// log.Println("Cookie", c.Request.Header.Get("Cookie"))
	c.JSON(http.StatusOK, gin.H{"data": string(jsonUserToSend)})
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
