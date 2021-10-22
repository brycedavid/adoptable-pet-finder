import { useState, useEffect } from "react";

import Card from "../UI/Card";
import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import { fetchData } from "../../lib/api";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  const resetData = () => {
    setIsLoading(true);
    setParsedData(null);
  };

  const sendRequest = async () => {
    console.log("Requesting organization data...");
    const data = await fetchData({
      searchType: "organizations",
      limit: props.limit,
    });
    console.log(data);
    let dataArray = [];

    for (let organization of data.data.organizations) {
      dataArray.push({
        key: organization.id,
        id: organization.id,
        address: organization.address,
        name: organization.name,
        phone: organization.phone,
        url: organization.url,
        animalsLink: organization._links.animals.href,
      });
    }

    setParsedData(dataArray);
    setIsLoading(false);
  };

  useEffect(() => {
    if (parsedData === null) {
      sendRequest();
    }

    return resetData;
  }, [fetchData, setParsedData, setIsLoading]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading) {
    return (
      <Card>
        {parsedData.map((organization) => (
          <AdoptionCenterDisplayItem
            key={organization.key}
            id={organization.id}
            address={organization.address}
            name={organization.name}
            phone={organization.phone}
            url={organization.url}
            animalsLink={organization.animalsLink}
          />
        ))}
      </Card>
    );
  }
};

export default AdoptionCenterDisplay;
