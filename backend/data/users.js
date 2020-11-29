import bcrypt from 'bcryptjs';

const users = [
    {
        name:'admin',
        email:'admin@test.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name:'John Doe',
        email:'johndoe@test.com',
        password:bcrypt.hashSync('123456', 10)
    },
    {
        name:'Jane Doe',
        email:'janedoe@test.com',
        password:bcrypt.hashSync('123456', 10)
    }
]

export default users;