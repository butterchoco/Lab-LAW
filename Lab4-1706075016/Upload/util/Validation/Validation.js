const ValidationErrorMessage = require("./ValidationErrorMessage");
const {
  minCharLength,
  minValLength,
  isEmail,
  hasLowerCase,
  hasUpperCase,
  hasNumericCase,
  hasSpecialCase,
  isSameAs,
  isRequired,
} = require("./Validator");

class Validation {
  constructor(allData, language = "id") {
    this.allData = allData;
    for (const field in allData) {
      this[field] = allData[field];
      this[field].name = field;
      this[field].language = language;
      this[field].allData = Object.keys(allData).map((data) => {
        return { name: data, value: allData[data].value };
      });
      this[field].touch = function () {
        return new Promise((resolve, reject) => {
          for (const node of this.validation) {
            const validation = node.split(":");
            if (validation[0] === "required") {
              if (!isRequired(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "required"
                ];
                return;
              }
            } else if (validation[0] === "isEmail") {
              if (!isEmail(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "isEmail"
                ];
                return;
              }
            } else if (validation[0] === "minCharLength") {
              if (!minCharLength(this.value, validation[1])) {
                this.error = ValidationErrorMessage(this.language, {
                  field,
                  value: validation[1],
                })["minCharLength"];
                return;
              }
            } else if (validation[0] === "minValLength") {
              if (!minValLength(this.value, validation[1])) {
                this.error = ValidationErrorMessage(this.language, {
                  field,
                  value: validation[1],
                })["minValLength"];
                return;
              }
            } else if (validation[0] === "hasLowerCase") {
              if (!hasLowerCase(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "hasLowerCase"
                ];
              }
            } else if (validation[0] === "hasUpperCase") {
              if (!hasUpperCase(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "hasUpperCase"
                ];
                return;
              }
            } else if (validation[0] === "hasNumericCase") {
              if (!hasNumericCase(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "hasNumericCase"
                ];
                return;
              }
            } else if (validation[0] === "hasSpecialCase") {
              if (!hasSpecialCase(this.value)) {
                this.error = ValidationErrorMessage(this.language, { field })[
                  "hasSpecialCase"
                ];
                return;
              }
            } else if (validation[0] === "sameAs") {
              const data = this.allData.find(
                ({ name }) => name === validation[1]
              );
              if (!isSameAs(this.value, data.value)) {
                this.error = ValidationErrorMessage(this.language, {
                  field,
                  otherField: validation[1],
                })["sameAs"];
                return;
              }
            }
          }
          if (Object.values(this.error).length > 0) reject(this.error);
          else resolve("Sukses");
        });
      };
    }
  }

  touch() {
    return new Promise((resolve, reject) => {
      const error = {};
      for (const field in this.allData) {
        this[field].touch();
        if (this[field].error !== "") error[field] = this[field].error;
      }
      if (Object.values(error).length > 0) reject(error);
      else resolve("Sukses");
    });
  }
}

module.exports = {
  Validation,
};
