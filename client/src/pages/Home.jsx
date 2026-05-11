import { Box, Container } from "@mui/material";
import About from "../components/Home/About";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: "radial-gradient(circle at top, #27364d, #020617 70%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Hero />
          <Features />
          <About />
        </Container>
      </Box>
    </>
  );
}
