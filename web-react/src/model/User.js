const GET_USER_QUERY = `
query UserQuery($email: String!) {
  User(email: $email) {
    count
  }
}
`

export async function getDbUserCount(user) {
    let responseDbUser;
    try {

        const path = '/graphql'
        responseDbUser = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_USER_QUERY,
                variables: { email: user.email }
            })
        })
    } catch (error) {
        console.log(error);
    }
    if (!responseDbUser) {
        return;
    }
    console.log(responseDbUser)
    return responseDbUser
}