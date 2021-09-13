// import 'tailwindcss/tailwind.css'
import "@styles/global.css";
import { UserProvider } from "@utils/useUser";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
