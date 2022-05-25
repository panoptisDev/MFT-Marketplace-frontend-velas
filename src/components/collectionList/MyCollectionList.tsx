import { InsertEmoticon } from '@material-ui/icons';
import Card3 from 'components/cards/Card3';
import './collectionList.scss'

const MyCollectionList = (props) => {
    const {collections} = props;
    return (
        <div className="collectionList" id = "sneak">
            {
                collections && collections.map((collection, index) => {
                    return <Card3 key = {index} collection={collection}/>
                })
            }    
        </div>
    )
}

export default MyCollectionList;