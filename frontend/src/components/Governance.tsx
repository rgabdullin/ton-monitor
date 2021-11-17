import { Grid, Box, Typography, Divider } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { GovernanceProps } from "./types";
import DataGrid from "./ui/DataGrid/DataGrid";

const Governance: React.FC<GovernanceProps> = (props: GovernanceProps) => {
  const { complaints, elections, offers } = props;
  return (
    <>
      <Typography variant="h5">{getText("governance.title")}</Typography>
      <Typography variant="body1">
        {getText("governance.election")}: {elections.status}
      </Typography>
      <Grid container>
        {elections.status === "open" && (
          <Grid item xs={6}>
            <div>
              <Typography variant="body1">
                {getText("governance.election.closes")}:
              </Typography>
              <Typography variant="body1">{elections.end}</Typography>
            </div>
          </Grid>
        )}
        <Grid item xs={elections.status === "open" ? 6 : 12}>
          <div>
            <Typography variant="body1">
              {getText("governance.election.next_starts")}:
            </Typography>
            <Typography variant="body1">{elections.start_next}</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="body1">
            {getText("governance.offers")}: {offers.all}
            {offers.new ? `(+${offers.new})` : ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {getText("governance.complaints")}: {complaints.all}
            {complaints.new ? `(+${complaints.new})` : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Governance;
