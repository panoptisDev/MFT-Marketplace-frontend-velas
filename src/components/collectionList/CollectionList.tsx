import Card1 from 'components/cards/Card1';
import './collectionList.scss'

const CollectionList = (props) => {
    const { collections } = props;
    
    return (
        <div className="collectionList" id = "sneak">
            {
                collections && collections.map((collection, index) => {
                    return <Card1 {...props} collection={collection} key={index}/>
                })
            }            
        </div>
    )
}

export default CollectionList;