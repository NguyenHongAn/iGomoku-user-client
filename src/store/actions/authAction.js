const signIn = (authData) => {
    return (dispatch) =>{
        dispatch({
            type: 'auth/signin',
            payload: authData,
        });
    }
}

const signOut = {
    type: 'auth/signout',
    payload: "",
}
const authActions ={
    signIn,
    signOut
}

export default authActions;