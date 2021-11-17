import { Grid, Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { GovernanceProps } from "./types";

const Governance: React.FC<GovernanceProps> = (props: GovernanceProps) => {
  const { complaints, elections, offers } = props;
  const modelIsAvailable =
    Object.keys(complaints).length &&
    Object.keys(offers).length &&
    Object.keys(elections).length;
  return (
    <>
      {modelIsAvailable ? (
        <>
          <Typography variant="h4">{getText("governance.title")}</Typography>
          <Typography variant="body1">
            {getText("governance.election")}: {elections.status}
          </Typography>
          <Grid container>
            {elections.status === "open" && (
              <Grid item xs={7}>
                <div>
                  <Typography variant="body1">
                    {getText("governance.election.closes")}: {elections.end}
                  </Typography>
                  <Typography variant="body1">
                    {getText("governance.election.next_starts")}:{" "}
                    {elections.start_next}
                  </Typography>
                </div>
              </Grid>
            )}
            <Grid item xs={5}>
              <div>
                <Typography variant="body1">
                  {getText("governance.offers")}: {offers.all}
                  {offers.new ? `(+${offers.new})` : ""}
                </Typography>
                <Typography variant="body1">
                  {getText("governance.complaints")}: {complaints.all}
                  {complaints.new ? `(+${complaints.new})` : ""}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </>
      ) : (
        <p>Service unavailable</p>
      )}
    </>
  );
};

export default Governance;
