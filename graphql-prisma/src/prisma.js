import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query
// prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }).catch(e => console.log(e))

// get all comments 
prisma.query.comments(null, `{
    id
    text
    author { id name }
    post { id title author { name } }
}`).then(data => {
    console.log(JSON.stringify(data, undefined, 2))
})

// prisma.mutation 
// prisma.subscription
// prisma.exists

