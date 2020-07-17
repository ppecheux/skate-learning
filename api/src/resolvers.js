export default ({
    SignInResponse: {
        token: async (obj, { email }, context, info) => {
            console.log("here")
            return "login user!";
        },
    },
    Query: {
        hello: () => 'world',
        signIn: async (obj, { email }, context, info) => {
            return "login user!";
        }

    }
})