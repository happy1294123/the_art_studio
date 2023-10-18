const bcrypt = require('bcryptjs')
const password = bcrypt.hashSync('12345678', 10)

module.exports = [{
  name: 'Sammi',
  email: 'teacher1@example.com',
  password,
  role: 'TEACHER',
  image: 'https://i.pravatar.cc/300'
}, {
  name: 'Abby',
  email: 'teacher2@example.com',
  password,
  role: 'TEACHER',
  image: 'https://i.pravatar.cc/300'
}, {
  name: 'Joanna',
  email: 'teacher3@example.com',
  password,
  role: 'TEACHER',
  image: 'https://i.pravatar.cc/300'
}, {
  name: 'Sherry',
  email: 'teacher4@example.com',
  password,
  role: 'TEACHER',
  image: 'https://i.pravatar.cc/300'
}, {
  name: 'Allen',
  email: 'happy1294123@gmail.com',
  password,
  role: 'STUDENT',
  image: 'https://i.pravatar.cc/300'
}, {
  name: '管理者',
  email: 'admin@example.com',
  password,
  role: 'ADMIN',
},
{
  name: '小編',
  email: 'editor@example.com',
  password,
  role: 'EDITOR',
}
]