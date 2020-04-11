package models

type SignUp struct {
	Nickname string `form:"user" json:"user" xml:"user"  binding:"required"`
	Email    string `form:"email" json:"email" xml:"email"  binding:"required"`
	Password string `form:"password" json:"password" xml:"password" binding:"required"`
}

type SignIn struct {
	Nickname string `form:"user" json:"user" xml:"user"`
	Email    string `form:"email" json:"email" xml:"email"`
	Password string `form:"password" json:"password" xml:"password"`
}

type CheckNick struct {
	Nickname string `form:"user" json:"user" xml:"user"  binding:"required"`
}

type SaveUserState struct {
	Nickname  string `form:"user" json:"user" xml:"user"  binding:"required"`
	Resources Resources
	Buildings MultiBuildings
}

type LoadUserState struct {
	Nickname string `form:"user" json:"user" xml:"user"  binding:"required"`
}
