export const prepPetFilter = (filter) => {
  let parsedValues = {};
  let { type, breed, gender, age, location } = filter;
  let valueArray = [
    "type",
    type,
    "breed",
    breed,
    "gender",
    gender,
    "age",
    age,
    "location",
    location,
  ];

  for (let i = 1; i < valueArray.length; i += 2) {
    if (valueArray[i] !== "any") {
      parsedValues[valueArray[i - 1]] = valueArray[i];
    }
  }

  if (parsedValues.type === "pets") {
    delete parsedValues.type;
  }

  return parsedValues;
};

export const prepOrgFilter = (filter) => {
  let parsedValues = {};
  let { location } = filter;
  let valueArray = ["location", location];

  for (let i = 1; i < valueArray.length; i += 2) {
    if (valueArray[i] !== "any") {
      parsedValues[valueArray[i - 1]] = valueArray[i];
    }
  }

  if (!location) {
    parsedValues = {};
  }

  return parsedValues;
};

export const parsePetData = (data) => {
  let dataArray = [];

  for (let animal of data.data.animals) {
    dataArray.push({
      key: animal.id,
      id: animal.id,
      name: animal.name,
      age: animal.age,
      fixed: animal.attributes.spayed_neutered,
      pictures: animal.photos,
      url: animal.url,
      type: animal.type,
      breed: animal.breeds.primary,
      size: animal.size,
      gender: animal.gender,
    });
  }

  return dataArray;
};

export const parseOrganizationData = (data) => {
  let dataArray = [];

  for (let organization of data.data.organizations) {
    dataArray.push({
      email: organization.email,
      key: organization.id,
      id: organization.id,
      phone: organization.phone,
      pictures: organization.photos,
      address: organization.address,
      name: organization.name,
      url: organization.url,
    });
  }

  return dataArray;
};
