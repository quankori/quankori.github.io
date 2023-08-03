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
              I have 5 years of experience in coding with technically Node.js
              and Go, and have a few technical DevOPS such as AWS, CI/CD,
              BashScript, and Solidity for a smart contract, recently I working
              and researching technical cloud engineering and communication
              skills. I can work back-end, and a few DevOps besides I see myself
              as strong about research and working with other technologies.
            </Typography>
          </section>

          <section>
            <Typography mt={5} variant="h5" align="center">
              My Technical
            </Typography>
            <Grid mt={10} container spacing={2}>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  width={50}
                />
                <p>Node.js</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg"
                  width={50}
                />
                <p>Nest.js</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
                  width={50}
                />
                <p>Go</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
                  width={50}
                />
                <p>Bash</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
                  width={50}
                />
                <p>Terraform</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
                  width={50}
                />
                <p>AWS</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                  width={50}
                />
                <p>Mongo</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                  width={50}
                />
                <p>MySQL</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  width={50}
                />
                <p>Docker</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
                  width={50}
                />
                <p>Nginx</p>
              </Grid>
            </Grid>
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
              <a
                href="https://www.credly.com/earner/earned/badge/277af70e-f2a4-44ce-b2db-2c861fe408e6"
                target="_blank"
              >
                <img
                  src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                  alt="AWS Certified Solutions Architect – Associate"
                  style={{ width: 150, height: 150 }}
                />
              </a>
            </Box>
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
        </div>
      </main>
    </Layout>
  );
}
