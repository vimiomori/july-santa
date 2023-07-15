import './Present.css'

interface PresentProps {
  name?: string
  imgSrc?: string
  message: string
}

export default function Present({ name, imgSrc, message }: PresentProps) {
  if (!imgSrc)
    return (
      <div className="Present">
        <p>{message}</p>
      </div>
    )

  return (
    <div className="Present">
      <div className="left">
        <h2>~ {name} ~</h2>
        <p>looks like christmas came early!!!</p>
        <p>you get {message}</p>
      </div>
      <div className="right">
        <img src={imgSrc} />
      </div>
    </div>
  )
}
