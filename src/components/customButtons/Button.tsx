import { HashLink } from 'react-router-hash-link'
import './buttonStyle.scss'
type ButtonProps = {
    className ? : string
    btnLabel ? : string
    btnIcon ? : HTMLScriptElement
    children ? : any
    link ? : string
    disabled ? : boolean 
    onClick ? : ()=>void
}
export default function Button(
    {
        className,
        btnLabel,
        btnIcon,
        link,
        children,
        disabled,
        onClick
    }: ButtonProps) {
  return (
    <button className={className} onClick = {onClick} disabled = {disabled}>
        {
        link ? <HashLink to={link} smooth>{children}</HashLink>:
        children
        }
    </button>
  )
}
