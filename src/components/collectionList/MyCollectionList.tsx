import EmptyCard from "../EmptyCard/EmptyCard";
import "./collectionList.scss";

const MyCollectionList = (props: any) => {
  const { collections } = props;
  console.log(collections, "this is collection");
  let array: any = [];
  for (let i = 0; i < 4; i++) {
    array = array.concat(collections);
  }
  return (
    <div className="collectionList" id="sneak">
      {collections &&
        array.map((collection: any, key: any) => {
          return (
            <EmptyCard
              collectionList={true}
              {...props}
              collection={collection}
              key={key}
            />
          );
        })}
    </div>
  );
};

export default MyCollectionList;
