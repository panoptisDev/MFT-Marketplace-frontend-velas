import EmptyCard from "../EmptyCard/EmptyCard";
import "./collectionList.scss";

const CollectionList = (props: any) => {
  const { collections, collectionsListPage } = props;
  return (
    <div
      className={`collectionList ${
        collectionsListPage && "collectionsListPage"
      }`}
      id="sneak"
    >
      {collections &&
        collections.map((collection: any, index: any) => {
          return (
            <EmptyCard
              collection={collection}
              collectionList={true}
              {...props}
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
