import { Reducer } from "redux"
import { User, UserActions, UserState } from "./types"

const date = new Date()
date.setDate(21)
date.setMonth(5)
date.setFullYear(2020)

const INITIAL_STATE: UserState = {
  selected: undefined,
  users: [
    {
      id: 0,
      avatarUrl: "https://avatars.githubusercontent.com/u/43068788?v=4",
      position: [-19.685392, -43.586517],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      id: 1,
      avatarUrl: "https://avatars.githubusercontent.com/u/52552199?v=4",
      position: [-19.685474, -43.58709],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Marcos, I like javascript, python and linux.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      id: 2,
      avatarUrl:
        "https://attachments.clickup.com/profilePictures/3208401_ky9.jpg",
      position: [-19.685099, -43.586733],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      id: 3,
      avatarUrl:
        "https://conteudo.imguol.com.br/c/entretenimento/c3/2017/11/24/albert-einstein-1511565360545_v2_1513x1920.jpg",
      position: [-19.684799, -43.586559],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
    {
      id: 4,
      avatarUrl: undefined,
      position: [-19.68536, -43.586221],
      available: "Afternoons",
      cellphone: "(31) 98726-4235",
      description: "I'm Alvaro, I like javascript.",
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: "Software developer",
      since: date,
    },
  ],
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActions.SELECT_USER: {
      const user: User | undefined = action.payload.user
      return { ...state, selected: user?.id }
    }
    default:
      return state
  }
}

export default reducer
