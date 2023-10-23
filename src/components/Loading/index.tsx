import s from './styles.module.scss'

export default function Loading() {
  return (
    <div className={s['loading-background']}>
      <div className={s['loading-bar']}>
        <div className={s['loading-circle-1']} />
        <div className={s['loading-circle-2']} />
      </div>
    </div>
  )
}
