import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import imgAvatar from "../images/home/avatar.jpg";
import { Avatar, Typography, Grid, Box } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Chip from "@mui/joy/Chip";
import timelines from "../json/timelines.json";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`About me`}
      description="quankori.github.io | quankori | Quan Nguyen"
    >
      <main>
        <div className="container">
          <section>
            <Avatar
              src={imgAvatar}
              sx={{ width: 150, height: 150 }}
              className="avatar"
              alt="profile"
            />
            <Typography variant="h4" align="center" mt={5}>
              Quan Nguyen
            </Typography>
          </section>

          <section>
            <Typography mt={5} variant="subtitle1" gutterBottom>
              I have 4 years of experience in coding with technically Node.js,
              and Go, and have a few technical front-end frameworks such as
              React.js, Angular, Vue.js and Solidity, Rust for a smart contract,
              recently I working and researching technical domain blockchain and
              communication skills. I can work full-stack with front-end,
              back-end, and a few blockchain but I see currently myself as
              having a stronger back-end than front-end besides I see myself as
              strong about research and work with other technologies.
            </Typography>
          </section>

          <section>
            <Typography mt={5} variant="h5" align="center">
              My Technical
            </Typography>
            <Grid mt={5} container spacing={2} style={{ position: "relative" }}>
              <Grid item xs={12} sm={6} className="grid-item">
                <Typography variant="h6" align="center">
                  Back-end / DevOPS
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {[
                    "Go",
                    "Node.js",
                    "Nest.js",
                    "BashScript",
                    "MongoDB",
                    "MySQL",
                    "Nginx",
                    "Docker",
                    "Truffle",
                    "Amazon Web Services",
                    "CI/CD",
                  ].map((name) => {
                    return <Chip key={name}>{name}</Chip>;
                  })}
                </Box>
              </Grid>
              {/* {!isMobile && <div className="magic-border"></div>} */}
              <Grid item xs={12} sm={6} className="grid-item">
                <Typography variant="h6" align="center">
                  Blockchain
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {[
                    "Solidity",
                    "Tendermint",
                    "Ethereum Virtual Machine",
                    "Web3.js",
                    "Ethers.js",
                    "IPFS",
                    "Hardhat",
                    "Truffle",
                    "DeFI",
                    "GameFI",
                    "Decentralized Exchange",
                  ].map((name) => {
                    return <Chip key={name}>{name}</Chip>;
                  })}
                </Box>
              </Grid>
            </Grid>
          </section>
          <section>
            <Typography mt={5} variant="h5" align="center">
              Timeline
            </Typography>
            {timelines.reverse().map((timeline) => {
              return (
                <TimelineItem key={timeline.year}>
                  <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
                    {timeline.year}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    {timeline.company ? (
                      <TimelineDot color="success">
                        <ApartmentIcon />
                      </TimelineDot>
                    ) : (
                      <TimelineDot color="primary">
                        <LaptopMacIcon />
                      </TimelineDot>
                    )}
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography fontWeight="bold">{timeline.name}</Typography>
                    <Typography>{timeline.description}</Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </section>
          <section>
            <Typography mt={5} variant="h5" align="center">
              Certifications
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
              }}
              mt={5}
              mb={5}
            >
              <a
                href="https://www.credly.com/earner/earned/badge/7f6efa2a-70e0-438b-ba6c-7d6d1c1265c5"
                target="_blank"
              >
                <img
                  src="https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
                  alt="AWS Certified Cloud Practitioner"
                  style={{ width: 150, height: 150 }}
                />
              </a>
            </Box>
          </section>
        </div>
      </main>
    </Layout>
  );
}
