import Card4 from 'components/cards/Card4';
import './collectionList.scss'
const NFTItemList = (props) => {
    const { items } = props;
    return (
        <div className="collectionList" id = "sneak">
            {
                items && items.map((item, index) => {
                    return <Card4 {...props} key={index} item={item}/>
                })
            }
        </div>
    )
}
export default NFTItemList;

