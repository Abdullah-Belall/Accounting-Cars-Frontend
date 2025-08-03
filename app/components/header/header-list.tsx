"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { CLIENT_COLLECTOR_REQ, SIGN_OUT_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";

export default function BasicList() {
  const router = useRouter();
  const handleSignOut = async () => {
    await CLIENT_COLLECTOR_REQ(SIGN_OUT_REQ);

    router.push("/log-in");
  };
  return (
    <Box
      className={"bg-myLight border-mdLight rounded-md"}
      sx={{ boxShadow: "0px 0px 3px -1px rgba(0, 0, 0, 0.54)" }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton className="hover:text-myDark group">
            <Link href={"/profile"}>
              <ListItemText className={"text-start text-nowrap"} primary="المعلومات الشخصية" />
            </Link>
            <ListItemIcon>
              <AccountBoxIcon className="mr-auto opacity-50 group-hover:opacity-100" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              onClick={handleSignOut}
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "cairo",
                },
              }}
              className={"text-start text-nowrap text-red-600"}
              primary="تسجيل الخروج"
            />
            <ListItemIcon>
              <LogoutIcon className="mr-auto text-red-600" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
}
