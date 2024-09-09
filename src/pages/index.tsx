import React from "react";
import Layout from "@theme/Layout";
import imgAvatar from "../images/home/avatar.jpg";
import { Avatar, Typography, Grid, Box } from "@mui/material";

export default function Home(): JSX.Element {
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
              I am a Full-Stack Software Engineer with 6 years of experience in
              backend development, focusing on Golang and Node.js. I have strong
              skills in designing and building scalable systems, especially in
              the fintech and blockchain domain. My main expertise includes
              server-side development, system architecture, and cloud computing,
              where I consistently deliver reliable and efficient solutions.
            </Typography>
            <Typography mt={5} variant="subtitle1" gutterBottom>
              I am passionate about learning and staying up-to-date with new
              technologies, and I am always looking to improve my skills. My
              long-term goal is to grow into a Technical Architect role, where I
              can use my technical knowledge and strategic thinking to create
              innovative solutions.
            </Typography>
          </section>

          <section>
            <Typography mt={5} variant="h5" align="center">
              My Technical Skills
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"
                  width={50}
                />
                <p>Nest.js</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                  width={50}
                />
                <p>React.js</p>
              </Grid>
              <Grid item xs={1} sm={1} className="grid-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
                  width={50}
                />
                <p>Vue.js</p>
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
                  width={50}
                />
                <p>Rust</p>
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
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
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                  width={50}
                />
                <p>PostgreSQL</p>
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
        </div>
      </main>
    </Layout>
  );
}
