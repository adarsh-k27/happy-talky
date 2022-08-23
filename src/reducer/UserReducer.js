import {SIGNIN_REQ,SIGNIN_SUCCESS,SIGNIN_FAIL} from '../actions'
export const userReducer = (state, action) => {
    switch (action.type) {
        case SIGNIN_REQ:
            return {
                ...state,
                Loading: true
            }
            case SIGNIN_SUCCESS :
                return {
                    ...state,
                    Loading: false,
                    UserDetails: action.payload
                }

            case 'SIGNIN_ERROR':return{
                ...state,
                Error:true
            }   
            default:return 
    }
}