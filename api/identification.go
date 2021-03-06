package api

import (
	"encoding/json"
)

// IdentificationName represents the payload for the identification name section.
type IdentificationName struct {
	PayloadName Payload `json:"Name" sql:"-"`

	Name *Name `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationName) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Name)

	return err
}

// Marshal to payload structure
func (entity *IdentificationName) Marshal() Payload {
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	return MarshalPayloadEntity("identification.name", entity)
}

// IdentificationBirthPlace represents the payload for the identification birth place section.
type IdentificationBirthPlace struct {
	Payload Payload `json:"Location" sql:"-"`

	Location *Location `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthPlace) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	location, err := entity.Payload.Entity()
	if err != nil {
		return err
	}
	entity.Location = location.(*Location)

	return err
}

// Marshal to payload structure
func (entity *IdentificationBirthPlace) Marshal() Payload {
	if entity.Location != nil {
		entity.Payload = entity.Location.Marshal()
	}
	return MarshalPayloadEntity("identification.birthplace", entity)
}

// IdentificationBirthDate represents the payload for the identification birth date section.
type IdentificationBirthDate struct {
	PayloadDate      Payload `json:"Date" sql:"-"`
	PayloadConfirmed Payload `json:"Confirmed" sql:"-"`

	Date      *DateControl `json:"-"`
	Confirmed *Checkbox    `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthDate) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	date, err := entity.PayloadDate.Entity()
	if err != nil {
		return err
	}
	entity.Date = date.(*DateControl)

	confirmed, err := entity.PayloadConfirmed.Entity()
	if err != nil {
		return err
	}
	entity.Confirmed = confirmed.(*Checkbox)

	return err
}

// Marshal to payload structure
func (entity *IdentificationBirthDate) Marshal() Payload {
	if entity.Date != nil {
		entity.PayloadDate = entity.Date.Marshal()
	}
	if entity.Confirmed != nil {
		entity.PayloadConfirmed = entity.Confirmed.Marshal()
	}
	return MarshalPayloadEntity("identification.birthdate", entity)
}

// IdentificationSSN represents the payload for the identification SSN section.
type IdentificationSSN struct {
	Payload Payload `json:"ssn" sql:"-"`

	Verified bool `json:"verified"`
	SSN      *SSN `json:"-" sql:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationSSN) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	ssn, err := entity.Payload.Entity()
	if err != nil {
		return err
	}
	entity.SSN = ssn.(*SSN)

	return err
}

// Marshal to payload structure
func (entity *IdentificationSSN) Marshal() Payload {
	if entity.SSN != nil {
		entity.Payload = entity.SSN.Marshal()
	}
	return MarshalPayloadEntity("identification.ssn", entity)
}

// IdentificationContacts represents the payload for the identification contact information section.
type IdentificationContacts struct {
	PayloadHomeEmail    Payload `json:"HomeEmail" sql:"-"`
	PayloadWorkEmail    Payload `json:"WorkEmail" sql:"-"`
	PayloadPhoneNumbers Payload `json:"PhoneNumbers" sql:"-"`

	HomeEmail    *Email      `json:"-"`
	WorkEmail    *Email      `json:"-"`
	PhoneNumbers *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationContacts) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	homeEmail, err := entity.PayloadHomeEmail.Entity()
	if err != nil {
		return err
	}
	entity.HomeEmail = homeEmail.(*Email)

	workEmail, err := entity.PayloadWorkEmail.Entity()
	if err != nil {
		return err
	}
	entity.WorkEmail = workEmail.(*Email)

	phoneNumbers, err := entity.PayloadPhoneNumbers.Entity()
	if err != nil {
		return err
	}
	entity.PhoneNumbers = phoneNumbers.(*Collection)

	return nil
}

// Marshal to payload structure
func (entity *IdentificationContacts) Marshal() Payload {
	if entity.HomeEmail != nil {
		entity.PayloadHomeEmail = entity.HomeEmail.Marshal()
	}
	if entity.WorkEmail != nil {
		entity.PayloadWorkEmail = entity.WorkEmail.Marshal()
	}
	if entity.PhoneNumbers != nil {
		entity.PayloadPhoneNumbers = entity.PhoneNumbers.Marshal()
	}
	return MarshalPayloadEntity("identification.contacts", entity)
}

// IdentificationOtherNames represents the payload for the identification other names section.
type IdentificationOtherNames struct {
	PayloadHasOtherNames Payload `json:"HasOtherNames" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	HasOtherNames *Branch     `json:"-"`
	List          *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationOtherNames) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	branch, err := entity.PayloadHasOtherNames.Entity()
	if err != nil {
		return err
	}
	entity.HasOtherNames = branch.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return nil
}

// Marshal to payload structure
func (entity *IdentificationOtherNames) Marshal() Payload {
	if entity.HasOtherNames != nil {
		entity.PayloadHasOtherNames = entity.HasOtherNames.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("identification.othernames", entity)
}

// ClearNoBranches Implements the Rejector interface and clears any nos on applicaiton kickback
func (entity *IdentificationOtherNames) ClearNoBranches() error {

	entity.HasOtherNames.ClearNo()
	entity.List.ClearBranchNo()

	return nil
}

// IdentificationPhysical represents the payload for the identification physical traits section.
type IdentificationPhysical struct {
	PayloadComments  Payload `json:"Comments" sql:"-"`
	PayloadEyeColor  Payload `json:"EyeColor" sql:"-"`
	PayloadHairColor Payload `json:"HairColor" sql:"-"`
	PayloadHeight    Payload `json:"Height" sql:"-"`
	PayloadSex       Payload `json:"Sex" sql:"-"`
	PayloadWeight    Payload `json:"Weight" sql:"-"`

	Comments  *Textarea `json:"-"`
	EyeColor  *Text     `json:"-"`
	HairColor *Text     `json:"-"`
	Sex       *Text     `json:"-"`
	Height    *Height   `json:"-"`
	Weight    *Number   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationPhysical) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Textarea)

	eye, err := entity.PayloadEyeColor.Entity()
	if err != nil {
		return err
	}
	entity.EyeColor = eye.(*Text)

	hair, err := entity.PayloadHairColor.Entity()
	if err != nil {
		return err
	}
	entity.HairColor = hair.(*Text)

	sex, err := entity.PayloadSex.Entity()
	if err != nil {
		return err
	}
	entity.Sex = sex.(*Text)

	height, err := entity.PayloadHeight.Entity()
	if err != nil {
		return err
	}
	entity.Height = height.(*Height)

	weight, err := entity.PayloadWeight.Entity()
	if err != nil {
		return err
	}
	entity.Weight = weight.(*Number)

	return err
}

// Marshal to payload structure
func (entity *IdentificationPhysical) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	if entity.EyeColor != nil {
		entity.PayloadEyeColor = entity.EyeColor.Marshal()
	}
	if entity.HairColor != nil {
		entity.PayloadHairColor = entity.HairColor.Marshal()
	}
	if entity.Height != nil {
		entity.PayloadHeight = entity.Height.Marshal()
	}
	if entity.Sex != nil {
		entity.PayloadSex = entity.Sex.Marshal()
	}
	if entity.Weight != nil {
		entity.PayloadWeight = entity.Weight.Marshal()
	}
	return MarshalPayloadEntity("identification.physical", entity)
}
