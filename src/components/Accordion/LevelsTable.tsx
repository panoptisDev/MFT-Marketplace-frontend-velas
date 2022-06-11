import "./styles.css";
const LevelsTable = ({ item }: any) => {
  return (
    <div className="what-so-ever">
      <div className="LvlPropStat-Tables">
        <div className="history-titles">
          <span className="span__item">Name</span>
          <span className="span__unit-price">Value</span>
          <span className="span__quantity">Total</span>
        </div>
        <div className="trading-values">
          {item.levels.map((level: any, key: any) => {
            return (
              <div key={key} className="each-traded-item">
                <span className="span__item">{level.name}</span>
                <span className="span__unit-price">{level.value}</span>
                <span className="span__from">{level.total}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelsTable;
