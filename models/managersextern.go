package models

type ManagersExtern struct {
	WaterManager  bool `form:"waterManager" json:"waterManager" xml:"waterManager"  binding:"required"`
	FoodManager   bool `form:"foodManager" json:"foodManager" xml:"foodManager"  binding:"required"`
	PeopleManager bool `form:"peopleManager" json:"peopleManager" xml:"peopleManager" binding:"required"`
}
