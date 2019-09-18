import { LOGOUT } from './actionTypes'
import { combineReducers } from 'redux'
import { message } from 'antd';
import axios from 'axios'

export const userinitialState = {}

export const userReducers = (state = userinitialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {}
        default:
            return state
    }
}

export function logout() {
    return (dispatch) => {
        axios.post('/logout')
            .then((resp) => {
                if (resp.status === 200) {
                    dispatch({
                        type: LOGOUT
                    })
                    message.success('注销成功')
                } else {
                    console.log('logout failed', resp)
                }
            })
            .catch((e) => {
                console.log('logout failed', e)
            })
    }
}

export const allReducers = combineReducers({
    user: userReducers,
})

// export default {
//     allReducers,
//     userinitialState
// }

// export default combineReducers({
//     user: userReducers,
// });