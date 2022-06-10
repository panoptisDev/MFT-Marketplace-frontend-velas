import Card1 from "../cards/Card1";
import EmptyCard from "../EmptyCard/EmptyCard";
import "./collectionList.scss";

const CollectionList = (props: any) => {
  const { collections } = props;
  let array: any = [];

  for (let i = 0; i < 4; i++) {
    array = array.concat(collections);
  }

  return (
    <div className="collectionList" id="sneak">
      {collections &&
        array.map((collection: any, index: any) => {
          return (
            <EmptyCard
              collectionList={true}
              {...props}
              collection={collection}
              key={index}
            />
          );
        })}
      {/* {collections &&
        collections.map((collection: any, index: any) => {
          return <Card1 {...props} collection={collection} key={index} />;
        })} */}
    </div>
  );
};

export default CollectionList;
