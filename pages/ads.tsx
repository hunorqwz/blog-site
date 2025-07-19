import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Container,
  Avatar,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";

interface AdBoxProps {
  id: number;
  title: string;
  description: string;
  logo?: string;
  category: string;
  onClick: () => void;
}

const AdBox: React.FC<AdBoxProps> = ({
  id,
  title,
  description,
  logo,
  category,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: 200,
        width: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(33, 33, 33, 0.9) 0%, rgba(66, 66, 66, 0.9) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: "100%", p: 2 }}>
        <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {logo || title.charAt(0)}
          </Avatar>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
              fontSize: "0.9rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 1,
              fontSize: "0.8rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
          <Chip
            label={category}
            size="small"
            sx={{
              fontSize: "0.7rem",
              height: 20,
            }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const AdSenseBlock: React.FC<{ slot: string; style?: React.CSSProperties }> = ({
  slot,
  style,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 4,
        ...style,
      }}
    >
      {/* Google AdSense placeholder - Replace with real AdSense code */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "728px",
          height: "90px",
          background: "linear-gradient(45deg, #e0e0e0, #f5f5f5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          border: "2px dashed #ccc",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Google AdSense Block ({slot})
        </Typography>
      </Box>
      {/* Uncomment and configure for real AdSense:
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "728px",
          height: "90px",
          ...style,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
        data-ad-slot={slot}
      ></ins>
      */}
    </Box>
  );
};

const AdsPage: React.FC = () => {
  const theme = useTheme();

  // Generate 100 dummy ads
  const generateAds = (): AdBoxProps[] => {
    const categories = ["Tech", "Finance", "Health", "Travel", "Food", "Fashion", "Sports", "Education"];
    const companies = [
      "TechCorp", "DataFlow", "CloudSync", "InnovateLab", "DigitalEdge", 
      "SmartSolutions", "FutureTech", "WebWorks", "CodeCraft", "DevTools",
      "SafeBank", "MoneyWise", "InvestPro", "CreditPlus", "PaySecure",
      "HealthFirst", "WellnessHub", "MedTech", "FitLife", "VitalCare",
      "TravelEase", "AdventureTime", "JourneyPlus", "ExploreWorld", "VoyageHub"
    ];

    return Array.from({ length: 100 }, (_, index) => {
      const category = categories[index % categories.length];
      const company = companies[index % companies.length];
      return {
        id: index + 1,
        title: `${company} ${index + 1}`,
        description: `Premium ${category.toLowerCase()} solution for modern businesses. Get started today!`,
        category,
        onClick: () => {
          // AdSense compliant - no incentivized clicks
          console.log(`Ad ${index + 1} clicked - redirecting to advertiser`);
          // window.open(`https://example.com/ad/${index + 1}`, '_blank');
        },
      };
    });
  };

  const ads = generateAds();

  return (
    <>
      <Head>
        <title>Sponsored Content - Blog Site</title>
        <meta name="description" content="Discover quality products and services from our trusted partners and sponsors." />
        <meta name="robots" content="index, follow" />
        {/* AdSense script - uncomment for real implementation */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
        */}
      </Head>

      <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2,
            }}
          >
            Sponsored Content
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Discover quality products and services from our trusted partners
          </Typography>
        </Box>

        {/* Top AdSense Block */}
        <AdSenseBlock slot="top-banner" />

        {/* Ad Grid */}
        <Grid container spacing={3}>
          {ads.slice(0, 24).map((ad, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={ad.id}>
              <AdBox {...ad} />
              {/* AdSense Block after 3rd row (every 12 items) */}
              {(index + 1) % 12 === 0 && index < 23 && (
                <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                  <AdSenseBlock
                    slot={`mid-content-${Math.floor((index + 1) / 12)}`}
                    style={{ margin: "2rem 0" }}
                  />
                </Grid>
              )}
            </Grid>
          ))}

          {/* Mid-content AdSense after 3rd row */}
          <Grid item xs={12}>
            <AdSenseBlock slot="mid-content" />
          </Grid>

          {/* Remaining ads */}
          {ads.slice(24).map((ad) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={ad.id}>
              <AdBox {...ad} />
            </Grid>
          ))}
        </Grid>

        {/* Footer AdSense Block */}
        <AdSenseBlock slot="footer-banner" style={{ marginTop: "3rem" }} />

        {/* Disclaimer */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Sponsored content helps support our blog. All advertisements are clearly marked and follow Google AdSense policies.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AdsPage;
