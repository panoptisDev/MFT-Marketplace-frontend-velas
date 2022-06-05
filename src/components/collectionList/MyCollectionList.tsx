import { InsertEmoticon } from "@material-ui/icons";
import Card3 from "../cards/Card3";
import "./collectionList.scss";

const MyCollectionList = (props: any) => {
  const { collections } = props;
  return (
    <div className="collectionList" id="sneak">
      {collections &&
        collections.map((collection: any, key: any) => {
          return <Card3 {...props} collection={collection} key={key} />;
        })}
    </div>
  );
};

export default MyCollectionList;
