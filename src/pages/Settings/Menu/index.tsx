import { useNavigate } from "react-router-dom";
import { Flex, Heading, Text, Grid } from "@radix-ui/themes";
import { RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { TbChevronRight, TbRulerMeasure } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import './setting-menu.scss';
import { useTranslation } from "react-i18next";

interface SettingCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  path: string;
  color: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const settingsCards: SettingCard[] = [
    {
      title: t("MODULES.SETTINGS.WORKSPACE_SETTINGS"),
      description: t("MODULES.SETTINGS.WORKSPACE_SETTINGS_DESCRIPTION"),
      icon: HiOutlineBuildingOffice2,
      path: "/settings/workspace",
      color: "var(--blue-9)",
    },
    {
      title: t("MODULES.SETTINGS.PROFILE_SETTINGS"),
      description: t("MODULES.SETTINGS.PROFILE_SETTINGS_DESCRIPTION"),
      icon: CgProfile,
      path: "/settings/profile",
      color: "var(--green-9)",
    },
    {
      title: t("MODULES.SETTINGS.CYCLE_SETTINGS"),
      description: t("MODULES.SETTINGS.CYCLE_SETTINGS_DESCRIPTION"),
      icon: IoCalendarOutline,
      path: "/settings/cycles",
      color: "var(--purple-9)",
    },
    {
      title: t("MODULES.SETTINGS.MEMBER_MANAGEMENT"),
      description: t("MODULES.SETTINGS.MEMBER_MANAGEMENT_DESCRIPTION"),
      icon: RiTeamLine,
      path: "/settings/members",
      color: "var(--orange-9)",
    },
    {
      title: t("MODULES.SETTINGS.MEASURE_UNIT_MANAGEMENT"),
      description: t("MODULES.SETTINGS.MEASURE_UNIT_MANAGEMENT_DESCRIPTION"),
      icon: TbRulerMeasure,
      path: "/settings/measures",
      color: "var(--cyan-9)",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="settings-menu">
      <div className="settings-menu__hero">
        <div className="settings-menu__hero-copy">
          <Text className="settings-menu__eyebrow">{t("MODULES.SETTINGS.WORKSPACE_CONTROL_CENTER")}</Text>
          <Heading size="6">{t("MODULES.SETTINGS.TITLE")}</Heading>
          <Text size="2" color="gray" className="settings-menu__subtitle">
            {t("MODULES.SETTINGS.DESCRIPTION")}
          </Text>
        </div>

        <Flex gap="2" className="settings-menu__hero-meta">
          <div className="settings-menu__pill">5 modules</div>
          <div className="settings-menu__pill">Role-based access</div>
        </Flex>
      </div>

      <Grid
        columns={{ initial: "1", sm: "2", lg: "3" }}
        gap="4"
        className="settings-menu__grid"
      >
        {settingsCards.map((card) => (
          <button
            type="button"
            key={card.path}
            className="setting-card"
            style={{ "--card-accent": card.color } as React.CSSProperties}
            onClick={() => handleCardClick(card.path)}
          >
            <Flex align="start" gap="3">
              <div className="setting-card__icon-wrap" style={{ background: `${card.color}15` }}>
                <card.icon size={24} color={card.color} />
              </div>
              <Flex direction="column" gap="1" className="setting-card__content">
                <div className="setting-card__title">{card.title}</div>
                <div className="setting-card__desc">{card.description}</div>
              </Flex>

              <div className="setting-card__chevron" aria-hidden="true">
                <TbChevronRight size={18} />
              </div>
            </Flex>
          </button>
        ))}
      </Grid>
    </div>
  );
}
