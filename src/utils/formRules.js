export const REQUIRED_RULE = [
  {
    required: true,
    message: 'This field is required!',
  },
];

export const EMAIL_RULE = [
  {
    type: 'email',
    message: 'Email is not correct!',
  },
  REQUIRED_RULE[0],
];

// Only letters, numbers and special characters(#$@!+-=%&*?) (without spaces)
export const PASSWORD_RULE = [
  REQUIRED_RULE[0],
  {
    pattern: new RegExp('^[A-Za-z0-9#$@!+-=%&)(*?]*$'),
    message: 'Only letters, numbers and special characters (#$@!+-=%&*?)',
  },
];

// Only one word without spaces
export const NAME_RULE = (lastOrFirst = 'first') => [
  REQUIRED_RULE[0],
  {
    pattern: new RegExp('^[a-zA-Z]+$'),
    message: `Enter ${lastOrFirst} name (without spaces)`,
  },
];

// Only full name (without spaces at the beginning/end, with a space between full name)
export const FULLNAME_RULE = [
  REQUIRED_RULE[0],
  {
    pattern: new RegExp('^[a-zA-Z]+ [a-zA-Z]+$'),
    message: 'Enter your full name (with a space between full name)',
  },
];

// Movie title without spaces at the beginning/end
export const MOVIE_TITLE_RULE = [
  REQUIRED_RULE[0],
  {
    pattern: new RegExp(/^[^\s].+[^\s]$/),
    message: 'Enter title (without spaces at the beginning/end)',
  },
];
