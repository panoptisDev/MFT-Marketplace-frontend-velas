import "./styles.css";

const LevelsTable = ({ item }: any) => {
  return (
    <div className="properties-stats-levels-container">
      {item.stats.length > 0 ? (
        <div>
          {item.stats.map((stat: any, key: any) => {
            return (
              <div className="properties-stats-levels" key={key}>
                <span>{stat.name}</span>
                <span>{stat.value}</span>
                <span>{stat.total}</span>
              </div>
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
};

export default LevelsTable;
