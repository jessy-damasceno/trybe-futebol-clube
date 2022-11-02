export const userMock = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
}

export const validLogin = {
    email: 'user@user.com',
    password: 'secret_user',
}

export const invalidLoginEmail = {
  email: 'invalidEmail@user.com',
  password: 'secret_user',
}

export const invalidLoginPassword = {
  email: 'user@user.com',
  password: 'invalid_password',
}

export const emptyEmail = {
  password: 'secret_user',
}

export const emptyPassword = {
  email: 'user@user.com',
}

export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjY2NzIyMDU5LCJleHAiOjE2NjczMjY4NTl9.lG-YdMDrlMKJkYRP2Fq_bJUA7gXQCvHQzlOO71DMdc0'
export const invalidToken = 'invalid.Token'
