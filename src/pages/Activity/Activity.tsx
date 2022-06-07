import React from "react";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import Filter from "../../components/filter/Filter";
import SelectMenu from "../../components/MoreComponents/SelectMenu";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./styles.css";

const Activity = () => {
  return (
    <div className="activity">
      <PageHeader pageHeader="Activity" />
      <div className="activity-container">
        <div className="activity-layer">
          <div className="activity-container-cards-1-2">
            <div className="activity-cards-container1">
              <ActivityCard activityCard1={true} />
              <ActivityCard activityCard1={true} />
              <ActivityCard activityCard1={true} />
              <ActivityCard activityCard1={true} />
            </div>
            <div className="activity-cards-container2">
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
            </div>
          </div>

          <div>
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
