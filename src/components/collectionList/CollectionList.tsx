import Card1 from 'components/cards/Card1';
import './collectionList.scss'
type CollectionType = {
    posY?:number
}
export default function CollectionList({posY}:CollectionType) {
 
    return (
        <div className="collectionList" id = "sneak">
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
            <Card1 link = {"/velas/velas-apes-club/"}/>
        </div>
    )
}

