import { HashLink } from 'react-router-hash-link'
import './buttonStyle.scss'
type ButtonProps = {
    className ? : string
    btnLabel ? : string
    btnIcon ? : HTMLScriptElement
    children ? : any
    link ? : string
    onClick ? : ()=>void
}
export default function Button(
    {
        className,
        btnLabel,
        btnIcon,
        link,
        children,
        onClick
    }: ButtonProps) {
  return (
    <button className={className} onClick = {onClick}>
        {
        link ? <HashLink to={link} smooth>{children}</HashLink>:
        children
        }
    </button>
  )
}
