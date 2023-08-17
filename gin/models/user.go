package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"column:name" json:"name"`
	LastName string `gorm:"column:last_name" json:"last_name"`
	Email    string `gorm:"unique;column:email" json:"email"`
	Password string `gorm:"column:password" json:"password"`
}

// SetPassword cifra y establece la contraseña del usuario
func (u *User) SetPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// CheckPassword verifica si la contraseña proporcionada coincide con la contraseña cifrada
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}
