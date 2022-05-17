import { InsertEmoticon } from '@material-ui/icons';
import Card3 from 'components/cards/Card3';
import './collectionList.scss'
type CollectionType = {
    items? : any
}
export default function MyCollectionList({items}:CollectionType) {
 
    

    return (
        <div className="collectionList" id = "sneak">
            {
                items.map((item) => {
                    return <Card3 item={item}/>
                })
            }    
        </div>
    )
}

