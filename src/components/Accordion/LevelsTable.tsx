import "./styles.css";
const LevelsTable = ({ item }: any) => {
  return (
    <div className="properties-stats-levels-container">
      {item.levels.map((level: any, key: any) => {
        return (
          <div className="properties-stats-levels" key={key}>
            <span>{level.name}</span>
            <span>{level.value}</span>
            <span>{level.total}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LevelsTable;
