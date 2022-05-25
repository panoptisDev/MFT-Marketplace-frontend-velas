import { InsertEmoticon } from '@material-ui/icons';
import Card3 from 'components/cards/Card3';
import './collectionList.scss'

const MyCollectionList = (props) => {
    const {collections} = props;
    return (
        <div className="collectionList" id = "sneak">
            {
<<<<<<< Updated upstream
                collections && collections.map((collection, index) => {
                    return <Card3 key = {index} collection={collection}/>
=======
                collections && collections.map((collection, key) => {
                    return <Card3 {...props} collection={collection} key={key}/>
>>>>>>> Stashed changes
                })
            }    
        </div>
    )
}

export default MyCollectionList;