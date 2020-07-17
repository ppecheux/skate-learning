const GET_USER_COUNT_QUERY = `
query UserQuery($email: String!) {
  User(email: $email) {
    count
  }
}
`

const ADD_NEW_USER = `
mutation ($email: String!){
    CreateUser(email: $email, count: 0) {
        email
        count
    }  
}
`

export async function getDbUserCount(user) {

    const path = '/graphql'
    let responseDbUser = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: GET_USER_COUNT_QUERY,
            variables: { email: user.email }
        })
    })

    let json = await responseDbUser.json()
    if (json.data & json.data.User & json.data.User.lenght) {
        return json.data.User[0]
    } else {
        responseDbUser = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: ADD_NEW_USER,
                variables: { email: user.email }
            })
        })
        json = await responseDbUser.json()
        return json.data.CreateUser
    }
}