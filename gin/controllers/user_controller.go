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

func GetUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID int64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func UpdateUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID int64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func DeleteUserHandler(serviceFunc func(c *gin.Context, db *gorm.DB, userID int64), db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := parseUserID(c)
		serviceFunc(c, db, userID)
	}
}

func parseUserID(c *gin.Context) int64 {
	userIDStr := c.Param("id")
	userID, _ := strconv.ParseInt(userIDStr, 10, 64)
	return userID
}
