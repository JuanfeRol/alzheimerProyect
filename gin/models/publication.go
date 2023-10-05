package models

import (
	"gorm.io/gorm"
)

type Publication struct {
	gorm.Model
	Title       string `gorm:"column:title" json:"title"`
	Description string `gorm:"column:description" json:"description"`
	Abstract    string `gorm:"column:abstract" json:"abstract"`
	GPTAbstract string `gorm:"column:gpt_abstract" json:"gpt_abstract"`
	DOI         string `gorm:"column:doi" json:"doi"`
}

// GetPublications obtiene todas las publicaciones
func GetPublications(db *gorm.DB) (*[]Publication, error) {
	var publications []Publication
	err := db.Find(&publications).Error
	if err != nil {
		return nil, err
	}
	return &publications, nil
}

// GetPublicationByID obtiene una publicación por su ID
func GetPublicationByID(db *gorm.DB, id int) (*Publication, error) {
	var publication Publication
	err := db.Where("id = ?", id).First(&publication).Error
	if err != nil {
		return nil, err
	}
	return &publication, nil
}

// CreatePublication crea una nueva publicación
func CreatePublication(db *gorm.DB, publication Publication) (*Publication, error) {
	err := db.Create(&publication).Error
	if err != nil {
		return nil, err
	}
	return &publication, nil
}

// UpdatePublication actualiza una publicación
func UpdatePublication(db *gorm.DB, publication Publication) (*Publication, error) {
	err := db.Save(&publication).Error
	if err != nil {
		return nil, err
	}
	return &publication, nil
}

// DeletePublication elimina una publicación
func DeletePublication(db *gorm.DB, id int) error {
	err := db.Where("id = ?", id).Delete(&Publication{}).Error
	if err != nil {
		return err
	}
	return nil
}

// GetPublicationsByTitle obtiene una publicación por su título
func GetPublicationsByTitle(db *gorm.DB, title string) (*[]Publication, error) {
	var publications []Publication
	err := db.Where("title LIKE ?", "%"+title+"%").Find(&publications).Error
	if err != nil {
		return nil, err
	}
	return &publications, nil
}
