import {getInitialData} from '../utils/api'
import {receiveQuestions} from '../actions/questions'
import {receivedUsers} from '../actions/users'
import {setAuthUser} from '../actions/auth'

const AUTH_ID = null
// const AUTH_ID = 'sarahedo'

export const handleInitialData = () => {
   return (dispatch) => {
     return getInitialData()
       .then(({ users, questions }) => {
         dispatch(receivedUsers(users))
         dispatch(receiveQuestions(questions))
         dispatch(setAuthUser(AUTH_ID))
       })
   }
 }