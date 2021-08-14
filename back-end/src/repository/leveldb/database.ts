import Level from 'level'

export const levelDatabase = Level('mydb', {
  valueEncoding: 'json',
})
