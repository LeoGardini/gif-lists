import { Paper } from "@mui/material";

function CardItem({ children }: { children: JSX.Element }) {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 3,
        display: "flex",
        borderRadius: "1.5rem",
        boxShadow: "rgb(90 114 123 / 20%) 0px 5px 5px 0px",
      }}
    >
      {children}
    </Paper>
  );
}

export default CardItem;
