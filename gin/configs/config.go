package configs

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"alzheimerProject/models"
	"alzheimerProject/utils"
)

// Debe ir en mayuscula la priemra letra si es modulo que se importa, sino en minuscula la primera letra
func SetupDatabase() *gorm.DB {
	// Se carga el archivo .env
	utils.LoadEnvFromFile(".env")

	// Se inicializan las variables de entorno
	USER := os.Getenv("DB_USER")
	PASS := os.Getenv("DB_PASS")
	HOST := os.Getenv("DB_HOST")
	PORT := os.Getenv("DB_PORT")
	DB_NAME := os.Getenv("DB_NAME")

	// Se define la variable por si hay algun error
	var err error

	// Connection string: "user:password@tcp(hostname:port)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	dbConnection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DB_NAME)

	// Se realiza la conexion a la base de datos con la string y el orm gorm
	dataBase, err := gorm.Open(mysql.Open(dbConnection), &gorm.Config{})

	// Si hay algun error se detiene la ejecucion
	if err != nil { // y se lanza el error
		panic(err)
	}

	// Se cargan los modelos en la base de datos
	dataBase.AutoMigrate(&models.User{})
	dataBase.AutoMigrate(&models.Publication{})

	// Se retorna la base de datos
	return dataBase
}
