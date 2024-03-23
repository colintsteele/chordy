import { createAction } from '@reduxjs/toolkit'

export const liftNote = createAction<number>('liftNote');