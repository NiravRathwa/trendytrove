import "./App.css";
import AppRoutes from "./routes/routes";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
