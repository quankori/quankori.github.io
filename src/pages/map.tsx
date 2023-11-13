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
                        subtitle={item.date}
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
                      The Joy of Discovery
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      I am captivated by the beauty of nature in its myriad
                      forms. Be it mountains, oceans, forests, or deserts, each
                      landscape tells its own story. I seek to immerse myself in
                      these natural wonders, finding a sense of peace and awe
                      that only nature can provide.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "10px" }}
                    >
                      Travel is a transformative experience. It has taught me
                      resilience, open-mindedness, and the value of living in
                      the moment. Each journey is a new chapter of
                      self-discovery, teaching me lessons that I carry with me
                      long after I return home.
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
    img: "https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/travels/Dalat_3.jpg",
    title: "Da Lat - Tổ Chim",
    date: "06/2023",
  },
  {
    img: "https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/travels/Sapa.jpg",
    title: "Sapa",
    date: "09/2022",
  },
  {
    img: "https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/travels/Dalat_1.jpg",
    title: "Da Lat - Hồ Tuyền Lâm",
    date: "07/2022",
  },
  {
    img: "https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/travels/DakLak.jpg",
    title: "Daklak - DraySap",
    date: "09/2021",
  },
  {
    img: "https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/travels/Dalat_2.jpg",
    title: "Da Lat - Đồi Thiên Phúc Đức",
    date: "01/2020",
  },
];
