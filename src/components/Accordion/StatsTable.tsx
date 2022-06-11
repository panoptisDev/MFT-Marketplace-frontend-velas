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
        <div className="trading-values LvlPropStat-Tables">
          {item.stats.length > 0 ? (
            <div>
              {item.stats.map((stat: any, key: any) => {
                return (
                  <div key={key} className="each-traded-item">
                    <span className="span__item">{stat.name}</span>
                    <span className="span__unit-price">{stat.value}</span>
                    <span className="span__from">{stat.total}</span>
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

export default LevelsTable;
