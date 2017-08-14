package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

// DateRange is a basic input.
type DateRange struct {
	From    Payload `json:"from"`
	To      Payload `json:"to"`
	Present bool    `json:"present"`
	from    DateControl
	to      DateControl
}

// Unmarshal bytes in to the entity properties.
func (entity *DateRange) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	from, err := entity.From.Entity()
	if err != nil {
		return err
	}

	to, err := entity.To.Entity()
	if err != nil {
		return err
	}

	entity.from = *from.(*DateControl)
	entity.to = *to.(*DateControl)
	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateRange) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.from.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := entity.to.Valid(); !ok {
		stack.Append("To", err)
	}

	if !stack.HasErrors() && entity.from.Date.After(entity.to.Date) {
		stack.Append("Range", model.ErrFieldRequired{"Date range is out of order"})
	}

	return !stack.HasErrors(), stack
}
