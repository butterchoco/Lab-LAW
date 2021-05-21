const reformatField = (field) => {
  if (field === undefined) return;
  return field.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

const ValidationErrorMessage = (language, props) => {
  if (language === "id") {
    return {
      required: `Field ${reformatField(props.field)} harus diisi terlebih dahulu`,
      isEmail: `Field ${reformatField(props.field)} harus memiliki format email yang valid`,
      minCharLength: `Field ${reformatField(props.field)} setidaknya memiliki ${props.value} karakter`,
      minValLength: `Field ${reformatField(props.field)} setidaknya memiliki nilai sebesar ${props.value}`,
      hasLowerCase: `Field ${reformatField(props.field)} setidaknya memiliki satu huruf kecil`,
      hasUpperCase: `Field ${reformatField(props.field)} setidaknya memiliki satu huruf kapital`,
      hasNumericCase: `Field ${reformatField(props.field)} setidaknya memiliki satu angka`,
      hasSpecialCase: `Field ${reformatField(props.field)} setidaknya memiliki satu simbol`,
      sameAs: `Field ${reformatField(props.field)} harus sama dengan field ${reformatField(props.otherField)}`,
    };
  } else {
    return {
      required: `${reformatField(props.field)} field should be filled first`,
      isEmail: `${reformatField(props.field)} field should has valid email format`,
      minCharLength: `${reformatField(props.field)} field should has character at least ${props.value}`,
      minValLength: `${reformatField(props.field)} field should has value at least ${props.value}`,
      hasLowerCase: `${reformatField(props.field)} field should has at least one lower case letter`,
      hasUpperCase: `${reformatField(props.field)} field should has at least one upper case letter`,
      hasNumericCase: `${reformatField(props.field)} field should has at least one number`,
      hasSpecialCase: `${reformatField(props.field)} field should has at least one symbol`,
      sameAs: `${reformatField(props.field)} field must have same value as ${reformatField(props.otherField)} field`,
    };
  }
};

module.exports = ValidationErrorMessage;
