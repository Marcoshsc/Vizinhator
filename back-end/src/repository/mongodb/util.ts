import { User } from '../../model/user'

export const getUserDTOFromUser = (savedUser: any) => {
  return {
    id: savedUser._id,
    avatarUrl: {
      value: savedUser.avatarUrl.value,
      hide: savedUser.avatarUrl.hide,
    },
    cellphone: {
      value: savedUser.cellphone.value,
      hide: savedUser.cellphone.hide,
    },
    occupation: {
      value: savedUser.occupation.value,
      hide: savedUser.occupation.hide,
    },
    available: {
      value: savedUser.available.value,
      hide: savedUser.available.hide,
    },
    description: {
      value: savedUser.description.value,
      hide: savedUser.description.hide,
    },
    closeFriend: true,
    since: savedUser.since,
    likes: 0,
    dislikes: 0,
    liked: false,
    disliked: false,
    messages: [],
    location: savedUser.position,
    name: savedUser.name,
  }
}
