import EmptyCard from "../EmptyCard/EmptyCard";
import "./collectionList.scss";

const MyCollectionList = (props: any) => {
  const { collections } = props;
  return (
    <div className="collectionList" id="sneak">
      {collections &&
        collections.map((collection: any, key: any) => {
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
