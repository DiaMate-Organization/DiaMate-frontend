import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mx-12 md:mx-20 mt-14 lg:pl-18 py-5">
      <div className="py-2 flex flex-col md:flex-between gap-5">
        <footer className="text-center text-xs md:text-sm text-muted-foreground">
          @ 2025 DiaMate Dev. All Right Reserved
        </footer>
        <div className="flex items-center justify-center gap-5">
          <Link href={"https://github.com/DiaMate-Organization"}>
            <GitHubLogoIcon className="h-5 w-5" />
          </Link>
          <Link href={"https://linkedin.com"}>
            <LinkedInLogoIcon className="h-5 w-5" />
          </Link>
          <Link href={"https://instagram.com"}>
            <InstagramLogoIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
