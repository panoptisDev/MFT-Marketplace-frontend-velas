import Card1 from 'components/cards/Card1';
import './collectionList.scss'
type CollectionType = {
    collections?:[]
}
export default function CollectionList({collections}:CollectionType) {
    return (
        <div className="collectionList" id = "sneak">
            {
                collections.map((collection) => {
                    return <Card1 collection={collection}/>
                })
            }            
        </div>
    )
}

