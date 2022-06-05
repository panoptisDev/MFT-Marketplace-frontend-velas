import React from "react";
import "./styles.css";
import activity from "../../assets/images/activity.jpg";
import Link from "../MoreComponents/Link";

const ActivityCard = ({ activityCard1 }: any) => {
  return (
    <div className="activity-card">
      <img src={activity} alt="" />
      <div className="activity-card-right">
        <Link title="Pinky Ocean" className="activity-card-link" navgitor="/" />
        {activityCard1 ? (
          <div className="activity-card-1">
            <div>
              following <span>Gayle Hicks</span>
            </div>
            <p>19th June, 2021</p>
          </div>
        ) : (
          <div className="activity-card-2">
            <div>
              listed by <span>Gayle Hicks</span>
            </div>
            <p>
              for<strong> 0.0047 ETH</strong>
            </p>
            <p>10 minutes ago</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
