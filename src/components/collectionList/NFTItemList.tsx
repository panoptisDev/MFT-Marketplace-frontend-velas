import Card4 from "../cards/Card4";
import "./collectionList.scss";
const NFTItemList = (props: any) => {
  const { items } = props;
  return (
    <div className="collectionList" id="sneak">
      {items &&
        items.map((item: any, index: any) => {
          return <Card4 {...props} key={index} item={item} />;
        })}
    </div>
  );
};
export default NFTItemList;
