import { useState, useEffect } from "react";

import Card from "../UI/Card";
import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    let response;

    const fetchAdoptionCenters = async () => {
      console.log("API request triggered; Adoption Center Display");
      try {
        response = await props.client.organization.search();

        if (response.status !== 200) {
          throw new Error("Request failed!");
        }
      } catch (err) {
        console.log(err.message || "Something went wrong... please try again.");
      }
      console.log(response);

      let dataArray = [];

      for (let organization of response.data.organizations) {
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

    fetchAdoptionCenters();
    return () => {
      setIsLoading(false);
      setParsedData(null);
    };
  }, [props.client]);

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
