import "./styles.css";

const PropertiesTable = ({ item }: any) => {
  console.log(item.properties, "thisis iasdasdasd");
  return (
    <div className="what-so-ever">
      <div className="LvlPropStat-Tables">
        <div className="history-titles">
          <span className="span__item">Type</span>
          <span className="span__unit-price">Name</span>
        </div>
        <div className="trading-values LvlPropStat-Tables">
          {item.properties.length > 0 ? (
            <div>
              {item.properties.map((property: any, key: any) => {
                return (
                  <div key={key} className="each-traded-item">
                    <span className="span__item">{property.name}</span>
                    <span className="span__unit-price">{property.type}</span>
                  </div>
                );
              })}
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default PropertiesTable;
