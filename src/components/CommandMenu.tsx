import React from "react";
import { Command } from "cmdk";

import { useStore } from "@nanostores/react";
import { isCommandMenuOpen } from "../store/nano";
import { navigate } from "astro:transitions/client";

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconCalendarMonth,
  IconFlare,
  IconHome,
  IconNotebook,
  IconPlaylist,
} from "@tabler/icons-react";

import "../styles/commandMenu.css";

const menu = [
  {
    name: "Home",
    href: "/",
    icon: "tabler:home",
    iconComp: <IconHome />,
    external: false,
  },
  {
    name: "Portafolio",
    href: "https://works.juanberrios.com",
    icon: "tabler:flare",
    iconComp: <IconFlare />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "Notas",
    href: "/notes",
    icon: "tabler:notebook",
    iconComp: <IconNotebook />,
    external: false,
  },
  {
    name: "Playlists",
    href: "/playlists",
    icon: "tabler:playlist",
    iconComp: <IconPlaylist />,
    external: false,
  },
  {
    name: "Now",
    href: "/now",
    icon: "tabler:calendar-month",
    iconComp: <IconCalendarMonth />,
    external: false,
  },
];

const platforms = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/soyjuanberrios",
    icon: "tabler:brand-instagram",
    iconComp: <IconBrandInstagram />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "GitHub",
    href: "https://github.com/byjuanberrios",
    icon: "tabler:brand-github",
    iconComp: <IconBrandGithub />,
    external: true,
    tag: "Link externo",
  },
  {
    name: "Twitter (X)",
    href: "https://twitter.com/byjuanberrios",
    icon: "tabler:brand-twitter",
    iconComp: <IconBrandTwitter />,
    external: true,
    tag: "Link externo",
  },
];

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const $isCommandMenuOpen = useStore(isCommandMenuOpen);

  // Toggle the menu when ⌘K is pressed || open the menu when $isCommandMenuOpen is `true`
  React.useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    if ($isCommandMenuOpen) setOpen(true);

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [$isCommandMenuOpen, setOpen]);

  const navigateTo = (href: string) => {
    if (!href) return;

    if (href.includes("mailto:")) {
      window.location.href = href;
    } else if (href.includes("//")) {
      window.open(href, "_blank", "noopener,noreferrer");
      isCommandMenuOpen.set(!$isCommandMenuOpen);
      setOpen(false);
    } else {
      isCommandMenuOpen.set(!$isCommandMenuOpen);
      setOpen(false);
      navigate(href);
    }
  };

  return (
    <div>
      <Command>
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
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
