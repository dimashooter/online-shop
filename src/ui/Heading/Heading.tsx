import React from 'react'
import cls from './Heading.module.scss'


interface HeadingProps {
  title: string,
  subtitle: string
}

export const Heading = (props: HeadingProps) => {
  const { subtitle, title } = props
  return (

    <div className={cls.wrapper}>
      {title && <h2 className={cls.title}>{title}</h2>}
      {subtitle && <p className={cls.subtitle}>{subtitle}</p>}
    </div>
  )
}

