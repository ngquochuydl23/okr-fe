import { useNavigate } from "react-router-dom";
import { Card, Flex, Heading, Text, Grid } from "@radix-ui/themes";
import { RiSettings3Line, RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import './setting-menu.scss';

interface SettingCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  path: string;
  color: string;
}

export default function Settings() {
  const navigate = useNavigate();

  const settingsCards: SettingCard[] = [
    {
      title: "Workspace Settings",
      description: "Manage workspace information, preferences and configurations",
      icon: HiOutlineBuildingOffice2,
      path: "/settings/workspace",
      color: "var(--blue-9)",
    },
    {
      title: "Profile Settings",
      description: "Update your personal information and account details",
      icon: CgProfile,
      path: "/settings/profile",
      color: "var(--green-9)",
    },
    {
      title: "Cycle Management",
      description: "Configure OKR cycles, timelines and review periods",
      icon: IoCalendarOutline,
      path: "/settings/cycles",
      color: "var(--purple-9)",
    },
    {
      title: "Member Management",
      description: "Manage team members, roles and permissions",
      icon: RiTeamLine,
      path: "/settings/members",
      color: "var(--orange-9)",
    },
    {
      title: "Measure Unit Management",
      description: "Define and configure measurement units for key results",
      icon: TbRulerMeasure,
      path: "/settings/measures",
      color: "var(--cyan-9)",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <Flex direction="column" gap="4">
      <div>
        <Heading size="6" mb="1">
          Settings
        </Heading>
        <Text size="2" color="gray">
          Configure your workspace preferences and manage your account
        </Text>
      </div>

      <Grid
        columns={{ initial: "1", sm: "2", lg: "3" }}
        gap="4"
        className="grid-menu"
      >
        {settingsCards.map((card) => (
          <div
            key={card.path}
            className="setting-card"
            onClick={() => handleCardClick(card.path)}
          >
            <Flex direction="column" gap="0.5">
              <Flex align="center" gap="1">
                <div className="icon-wrap" style={{ background: `${card.color}15` }}>
                  <card.icon size={24} color={card.color} />
                </div>
                <div className="card-title">{card.title}</div>
              </Flex>
              <div className="card-desc">{card.description}</div>
            </Flex>
          </div>
        ))}
      </Grid>
    </Flex>
  );
}
