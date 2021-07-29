import { User, UserDTO } from '../model/user'

export const addUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  const user = new User({
    position: userDTO.location,
    name: userDTO.name,
    cellphone: {
      ...userDTO.cellphone,
    },
    occupation: {
      ...userDTO.occupation,
    },
    available: {
      ...userDTO.available,
    },
    avatarUrl: {
      ...userDTO.avatarUrl,
    },
    description: {
      ...userDTO.description,
    },
    since: new Date(),
    closeFriendsIds: [],
    likedBy: [],
    dislikedBy: [],
    messages: [],
  })
  const savedUser = await user.save()
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
