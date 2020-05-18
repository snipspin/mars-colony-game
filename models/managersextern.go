package models

type ManagersExtern struct {
	WaterManager  bool `form:"waterManager" json:"waterManager" xml:"waterManager"`
	FoodManager   bool `form:"foodManager" json:"foodManager" xml:"foodManager"`
	PeopleManager bool `form:"peopleManager" json:"peopleManager" xml:"peopleManager"`
}
