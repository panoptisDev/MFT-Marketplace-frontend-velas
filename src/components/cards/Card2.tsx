import { Link } from 'react-router-dom'
import './card.scss'

type PropsType = {
    href ?: string

}
export default function Card2({
    href,
}:PropsType) {
  return (
    <div className="collectionItem">
        <Link to={href}>
                <img src={'https://m.raregems.io/c/21725?optimizer=image&amp;width=400'} alt = ''/>
                <div className="collectionInfo">
                    <img src={'/assets/img/faces/camp.jpg'}  alt = ''/>
                    <br />
                    <strong>etect V3</strong>
                    <div>by you</div>
                    <div style={{ margin: '25px 0' }}>Explore the etet V3 collection</div>
                    <div style={{ marginBottom: '25px' }}>0 items</div>
                </div>
        </Link>
    </div>
  )
}
