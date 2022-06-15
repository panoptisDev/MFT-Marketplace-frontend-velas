import "./styles.css";

const PropertiesTable = ({ item }: any) => {
  return (
    <div className="properties-stats-levels-container">
      {item.properties.length > 0 ? (
        <div>
          {item.properties.map((property: any, key: any) => {
            return (
              <div key={key}>
                <span>{property.name}</span>
                <span>{property.type}</span>
              </div>
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
};

export default PropertiesTable;
