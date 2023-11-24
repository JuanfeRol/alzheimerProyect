package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		serviceFunc(c, db)
	}
}

func LoginHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userEmail string, userPassword string), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := parseEmailAndPassword(c)
		serviceFunc(c, db, user["email"], user["password"])
	}
}

func GetUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID uint64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func UpdateUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID uint64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func DeleteUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID uint64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func parseUserID(c *gin.Context) uint64 {
	userIDStr := c.Param("id")
	userID, _ := strconv.ParseUint(userIDStr, 10, 64)
	return userID
}

func parseEmailAndPassword(c *gin.Context) map[string]string {
	var user map[string]string
	c.BindJSON(&user)
	return user
} // no se puede BindearJson doblemente en otra funcion
