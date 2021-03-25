import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function github() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      axios
        .get(
          `http://localhost:8001/auth/get-token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&code=${code}`
        )
        .then(({ data }) => {
          const tempArr = data.split("&")[0].split("=");
          if (tempArr[0] === "error") router.push("/");
          Cookies.set("a_t", tempArr[1], { expires: 7 });
          router.push("/");
        });
    }
  }, [router]);

  return <>404 Not Found</>;
}
