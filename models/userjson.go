package models

type UserJson struct {
	Nickname string `form:"user" json:"user" xml:"user"  binding:"required"`
	Email    string `form:"email" json:"email" xml:"email"  binding:"required"`
	Password string `form:"password" json:"password" xml:"password" binding:"required"`
}
type NickJson struct {
	Nickname string `form:"user" json:"user" xml:"user"  binding:"required"`
}
