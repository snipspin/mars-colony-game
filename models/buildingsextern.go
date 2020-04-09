package models

type SaveBuildings struct {
	Buildings MultiBuildings `json:"buildings"`
}

type MultiBuildings struct {
	Building []SingleBuilding `json:"building"`
}

type SingleBuilding struct {
	Type   string `json:"type"`
	Level  string `json:"level"`
	Lot    string `json:"lot"`
	Amount string `json:"amount"`
	Timer  string `json:"timer"`
}
