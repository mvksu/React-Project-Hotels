export function validateEmail(text) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(text);
}

// rules

const avaliableRules = {
  required(value) {
    return value ? '' : 'Pole wymagane';
  },
  min(value, rule) {
    return value.length > rule.length ? '' : `Min. ${rule.length} znaków`
  },
  email(value) {
    return validateEmail(value) ? '' : 'Niepoprawny email'
  }
}

// validation

export function validate(rules, value) {

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule instanceof Object) {
      const ErrorMessage = avaliableRules[rule.rule](value, rule);
      if (ErrorMessage) {
        return ErrorMessage;
      }
    } else {
      const ErrorMessage = avaliableRules[rule](value);
      if (ErrorMessage) {
        return ErrorMessage;
      }
    }

  }

  return '';
}