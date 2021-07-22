import { Reducer } from "redux"
import { Message, User, UserActions, UserState } from "./types"

const date = new Date()
date.setDate(21)
date.setMonth(5)
date.setFullYear(2020)

const INITIAL_STATE: UserState = {
  selected: undefined,
  changingLocation: false,
  showProfile: true,
  logged: {
    id: 10,
    avatarUrl: {
      value: "https://attachments.clickup.com/profilePictures/3208401_ky9.jpg",
      hide: false,
    },
    position: [-19.685099, -43.586733],
    available: {
      value: "Afternoons",
      hide: false,
    },
    cellphone: {
      value: "(31) 98726-4235",
      hide: false,
    },
    description: {
      value: "I'm Alvaro, I like javascript.",
      hide: false,
    },
    likes: 3,
    dislikes: 4,
    name: "Álvaro Basílio",
    occupation: {
      value: "Software developer",
      hide: false,
    },
    since: date,
    closeFriend: true,
    liked: false,
    disliked: true,
    messages: [],
  },
  users: [
    {
      id: 0,
      avatarUrl: {
        value: "https://avatars.githubusercontent.com/u/43068788?v=4",
        hide: false,
      },
      position: [-19.685392, -43.586517],
      available: {
        value: "Afternoons",
        hide: false,
      },
      cellphone: {
        value: "(31) 98726-4235",
        hide: false,
      },
      description: {
        value: "I'm Alvaro, I like javascript.",
        hide: false,
      },
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: {
        value: "Software developer",
        hide: false,
      },
      since: date,
      closeFriend: true,
      liked: true,
      disliked: false,
      messages: [
        {
          id: 0,
          body: "Hello Man! Hello Man! Hello Man! Hello Man! Hello Man! Hello Man! ",
          sentAt: date,
          logged: true,
        },
        { id: 1, body: "Hello Man!", sentAt: date, logged: false },
      ],
    },
    {
      id: 1,
      avatarUrl: {
        value: "https://avatars.githubusercontent.com/u/52552199?v=4",
        hide: false,
      },
      position: [-19.685474, -43.58709],
      available: {
        value: "Afternoons",
        hide: false,
      },
      cellphone: {
        value: "(31) 98726-4235",
        hide: false,
      },
      description: {
        value: "I'm Marcos, I like javascript, python and linux.",
        hide: false,
      },
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: {
        hide: false,
        value: "Software developer",
      },
      since: date,
      closeFriend: true,
      liked: false,
      disliked: true,
      messages: [
        { id: 0, body: "Hello Man!", sentAt: date, logged: true },
        { id: 1, body: "Hello Man!", sentAt: date, logged: false },
      ],
    },
    {
      id: 2,
      avatarUrl: {
        value:
          "https://attachments.clickup.com/profilePictures/3208401_ky9.jpg",
        hide: false,
      },
      position: [-19.685099, -43.586733],
      available: {
        value: "Afternoons",
        hide: false,
      },
      cellphone: {
        value: "(31) 98726-4235",
        hide: false,
      },
      description: {
        value: "I'm Alvaro, I like javascript.",
        hide: false,
      },
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: {
        value: "Software developer",
        hide: false,
      },
      since: date,
      closeFriend: true,
      liked: false,
      disliked: true,
      messages: [
        { id: 0, body: "Hello Man!", sentAt: date, logged: true },
        { id: 1, body: "Hello Man!", sentAt: date, logged: false },
      ],
    },
    {
      id: 3,
      avatarUrl: {
        value:
          "https://conteudo.imguol.com.br/c/entretenimento/c3/2017/11/24/albert-einstein-1511565360545_v2_1513x1920.jpg",
        hide: false,
      },
      position: [-19.684799, -43.586559],
      available: {
        value: "Afternoons",
        hide: false,
      },
      cellphone: {
        value: "(31) 98726-4235",
        hide: false,
      },
      description: {
        value: "e=mc2.",
        hide: false,
      },
      likes: 3,
      dislikes: 4,
      name: "Albert Einstein",
      occupation: {
        value: "Software developer",
        hide: false,
      },
      since: date,
      closeFriend: false,
      liked: false,
      disliked: true,
      messages: [
        { id: 0, body: "Hello Man!", sentAt: date, logged: true },
        { id: 1, body: "Hello Man!", sentAt: date, logged: false },
      ],
    },
    {
      id: 4,
      avatarUrl: undefined,
      position: [-19.68536, -43.586221],
      available: {
        value: "Afternoons",
        hide: false,
      },
      cellphone: {
        value: "(31) 98726-4235",
        hide: false,
      },
      description: {
        value: "I'm Alvaro, I like javascript.",
        hide: false,
      },
      likes: 3,
      dislikes: 4,
      name: "Álvaro Basílio",
      occupation: {
        value: "Software developer",
        hide: false,
      },
      since: date,
      closeFriend: false,
      liked: false,
      disliked: true,
      messages: [
        { id: 0, body: "Hello Man!", sentAt: date, logged: true },
        { id: 1, body: "Hello Man!", sentAt: date, logged: false },
      ],
    },
  ],
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActions.SELECT_USER: {
      const user: User | undefined = action.payload.user
      return { ...state, selected: user?.id }
    }
    case UserActions.CHANGE_LOCATION: {
      return {
        ...state,
        changingLocation: action.payload.value,
        changingLocationCallback: action.payload.callback,
      }
    }
    case UserActions.SEND_MESSAGE: {
      const message: Message = action.payload.message
      const user: User = action.payload.user
      const entityUser = state.users.find((el) => el.id === user.id) as User
      entityUser.messages.push(message)
      return {
        ...state,
        users: [
          ...state.users.filter((el) => el.id !== user.id),
          { ...entityUser, messages: [...entityUser.messages] },
        ],
      }
    }
    case UserActions.SHOW_PROFILE: {
      return { ...state, showProfile: action.payload.value }
    }
    case UserActions.SELECT_LOCATION: {
      return { ...state, selectedLocation: action.payload.location }
    }
    default:
      return state
  }
}

export default reducer
