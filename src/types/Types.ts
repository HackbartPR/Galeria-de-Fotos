import React, { FormEvent, FormEventHandler, MouseEventHandler } from 'react'

export type Photo = {
  name: string
  url: string
}

export type Gallery = {
  photos: Photo[]
  handleOnClick: (photo: Photo) => void
}

export type Uploader = {
  handleOnSubmit: FormEventHandler<HTMLFormElement>
  uploading: boolean
}

export type Modal = {
  photo: Photo
  handleCloseModal: () => void
  handleDeletePhoto: (name: string) => void
}

export const PhotoDefault = {
  name: '',
  url: '',
}
