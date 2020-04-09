package models

type SaveBuildings struct {
	Buildings Buildings `json:"buildings"`
}

type Buildings struct {
	Building []Building `json:"building"`
}

type Building struct {
	Type   string `json:"type"`
	Level  string `json:"level"`
	Lot    string `json:"lot"`
	Amount string `json:"amount"`
	Timer  string `json:"timer"`
}
