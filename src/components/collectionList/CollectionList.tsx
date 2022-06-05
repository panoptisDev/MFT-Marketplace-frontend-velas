import Card1 from "../cards/Card1";
import "./collectionList.scss";

const CollectionList = (props: any) => {
  const { collections } = props;

  return (
    <div className="collectionList" id="sneak">
      {collections &&
        collections.map((collection: any, index: any) => {
          return <Card1 {...props} collection={collection} key={index} />;
        })}
    </div>
  );
};

export default CollectionList;
