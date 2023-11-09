import React from "react";
import Layout from "@theme/Layout";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export default function Map(): JSX.Element {
  return (
    <Layout>
      <main>
        <Container maxWidth={false} sx={{ maxWidth: "90%", mt: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <ImageList>
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.img}
                      sx={{
                        transition: "0.3s",
                        "&:hover": {
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", // Bóng đổ khi hover
                        },
                      }}
                      style={{ margin: "10px", borderRadius: "10px" }}
                    >
                      <img
                        src={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                        style={{ borderRadius: "10px" }}
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        style={{ borderRadius: "10px" }}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.title}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="div"
                      sx={{ color: "error.main", fontWeight: "bold" }}
                    >
                      FREE TRAVEL PHOTOS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We have an impressive collection of over 20,000+ free
                      creative commons (CC BY-NC 4.0 Attribution-NonCommercial)
                      travel photos from around the world that anyone can
                      utilize. If you're seeking higher-definition versions of
                      these photos, please{" "}
                      <Box
                        component="span"
                        sx={{ color: "primary.main", cursor: "pointer" }}
                        onClick={() => {
                          /* handle contact action */
                        }}
                      >
                        contact me.
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </Layout>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
];
