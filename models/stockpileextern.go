package models

type Resources struct {
	Water  string `form:"water" json:"water" xml:"water"  binding:"required"`
	Food   string `form:"food" json:"food" xml:"food"  binding:"required"`
	People string `form:"people" json:"people" xml:"people" binding:"required"`
}
