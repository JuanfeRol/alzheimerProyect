package models

import (
	"gorm.io/gorm"
)

type Publication struct {
	gorm.Model
	Title       string `gorm:"column:title" json:"title"`
	Description string `gorm:"column:description" json:"description"` // to-do: Gtp will make the description
	Abstract    string `gorm:"column:abstract" json:"abstract"`
	DOI         string `gorm:"column:doi" json:"doi"`
	DOILink     string `gorm:"column:doi_link" json:"doi_link"`
	Body        string `gorm:"column:body" json:"body"` // final body to send
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
	// Compare title to know if the publication exists
	var publicationExists Publication
	err := db.Where("title = ?", publication.Title).First(&publicationExists).Error
	if err != nil {
		err = db.Create(&publication).Error
		if err != nil {
			return nil, err
		}

		return &publication, nil
	}
	return &publicationExists, nil
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

func GetLastPublication(db *gorm.DB) (*Publication, error) {
	var publication Publication
	err := db.Last(&publication).Error
	if err != nil {
		return nil, err
	}
	return &publication, nil
}
