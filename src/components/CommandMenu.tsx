import React from "react";
import { Command } from "cmdk";

import { useStore } from "@nanostores/react";
import { isCommandMenuOpen } from "../store/nano";
import { navigate } from "astro:transitions/client";

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandVsco,
  IconCalendarMonth,
  IconFlare,
  IconHome,
  IconNotebook,
  IconPlaylist,
  IconLibrary,
} from "@tabler/icons-react";

import "../styles/commandMenu.css";

const menu = [
  {
    name: "Home",
    href: "/",
    iconComp: <IconHome />,
    external: false,
  },
  {
    name: "Portafolio",
    href: "https://works.juanberrios.com",
    iconComp: <IconFlare />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "Notas",
    href: "/notes",
    iconComp: <IconNotebook />,
    external: false,
  },
  {
    name: "Playlists",
    href: "/playlists",
    iconComp: <IconPlaylist />,
    external: false,
  },
  {
    name: "Now",
    href: "/now",
    iconComp: <IconCalendarMonth />,
    external: false,
  },
  {
    name: "Listas",
    href: "/lists",
    iconComp: <IconLibrary />,
    external: false,
  },
];

const platforms = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/byjuanberrios",
    iconComp: <IconBrandInstagram />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "GitHub",
    href: "https://github.com/byjuanberrios",
    iconComp: <IconBrandGithub />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "Twitter (X)",
    href: "https://twitter.com/byjuanberrios",
    iconComp: <IconBrandTwitter />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "VSCO",
    href: "https://vsco.co/byjuanberrios",
    iconComp: <IconBrandVsco />,
    external: true,
    tag: "Link externo",
  },
];

export const CommandMenu = () => {
  const $isCommandMenuOpen = useStore(isCommandMenuOpen);

  // Toggle the menu when ⌘K is pressed (open the menu when $isCommandMenuOpen is `true`)
  React.useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isCommandMenuOpen.set(!$isCommandMenuOpen);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [$isCommandMenuOpen]);

  const navigateTo = (href: string) => {
    if (!href) return;

    if (href.includes("mailto:")) {
      window.location.href = href;
    } else if (href.includes("//")) {
      window.open(href, "_blank", "noopener,noreferrer");
      isCommandMenuOpen.set(!$isCommandMenuOpen);
    } else {
      isCommandMenuOpen.set(!$isCommandMenuOpen);
      navigate(href);
    }
  };

  return (
    <div>
      <Command
        filter={(value, search) => {
          if (value.includes(search)) return 1;
          return 0;
        }}
        // filter={(value, search, keywords) => {
        //   const extendValue = value + " " + keywords.join(" ");
        //   if (extendValue.includes(search)) return 1;
        //   return 0;
        // }}
      >
        <Command.Dialog
          open={$isCommandMenuOpen}
          onOpenChange={() => isCommandMenuOpen.set(!$isCommandMenuOpen)}
        >
          <Command.Input placeholder="Ir a..." />
          <Command.List>
            <Command.Empty>No hay resultados</Command.Empty>

            <Command.Group heading="Páginas">
              {menu.map((m, i) => (
                <Command.Item
                  style={{ contentVisibility: "auto" }}
                  key={i}
                  onSelect={() => navigateTo(m.href)}
                >
                  {m.iconComp}
                  <span className="name">{m.name}</span>
                  {m.tag && <span className="tag">{m.tag}</span>}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Plataformas">
              {platforms.map((p, i) => (
                <Command.Item
                  style={{ contentVisibility: "auto" }}
                  key={i}
                  onSelect={() => navigateTo(p.href)}
                >
                  {p.iconComp}
                  <span className="name">{p.name}</span>
                  {p.tag && <span className="tag">{p.tag}</span>}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      </Command>
    </div>
  );
};
