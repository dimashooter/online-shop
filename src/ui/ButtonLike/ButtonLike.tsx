import { IconHeart } from '@tabler/icons-react'
import React, { memo } from 'react'
import cls from './ButtonLike.module.scss'

interface ButtonLikeProps {
  onClick: () => void
  likeCount: number,
  likedByMe: boolean
  isloading: boolean
}

export const ButtonLike = memo((props: ButtonLikeProps) => {
  const { likeCount, isloading, likedByMe, onClick } = props

  return (
    <button disabled={isloading} onClick={onClick} className={cls.button}>
      <IconHeart width={30} height={30} color={likedByMe ? 'red' : 'grey'}
      />
      <span>{likeCount}</span>
    </button>
  )
})



ButtonLike.displayName = 'ButtonLike'
