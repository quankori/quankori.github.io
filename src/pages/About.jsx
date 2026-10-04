import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  CameraOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { CATEGORIES, pagePath } from "../content/registry.js";
import { EXPERIENCE, PROFILE } from "../data/profile.js";
import { CategoryIcon } from "../components/icons.jsx";
import { useDocumentTitle } from "../components/useDocumentTitle.js";
import styles from "./About.module.css";

const { Title, Paragraph, Text } = Typography;

const CATEGORY_BLURB = {
  english:
    "Grammar turned into pictures: timelines, gauges and flashcards instead of walls of text.",
  travel: "Places I have walked through with a camera, one gallery per trip.",
  technology: "Interactive explainers on the protocols I build with every day.",
};

const LINKS = [
  { href: PROFILE.github, icon: <GithubOutlined />, label: "GitHub" },
  { href: PROFILE.linkedin, icon: <LinkedinOutlined />, label: "LinkedIn" },
  { href: PROFILE.flickr, icon: <CameraOutlined />, label: "Flickr" },
  { href: `mailto:${PROFILE.email}`, icon: <MailOutlined />, label: "Email" },
];

export default function About() {
  useDocumentTitle(null);
  const timeline = [...EXPERIENCE].reverse();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <Avatar
          src={PROFILE.portrait}
          size={128}
          className={styles.portrait}
          alt="Portrait of Quan"
        />
        <div className={styles.heroText}>
          <Text className={styles.hello}>Hi, I'm</Text>
          <Title level={1} className={styles.name}>
            {PROFILE.name}
          </Title>
          <Paragraph className={styles.role}>{PROFILE.role}</Paragraph>
          <div className={styles.meta}>
            <span>
              <EnvironmentOutlined /> {PROFILE.location}
            </span>
          </div>
          <div className={styles.links}>
            {LINKS.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                icon={link.icon}
                shape="round"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Title level={3} className={styles.sectionTitle}>
        Explore the notebook
      </Title>
      <Row gutter={[16, 16]}>
        {CATEGORIES.map((category) => (
          <Col xs={24} md={8} key={category.key}>
            <Card
              className={`${styles.categoryCard} ${styles[category.key] ?? ""}`}
              variant="borderless"
            >
              <div className={styles.categoryIcon}>
                <CategoryIcon name={category.icon} />
              </div>
              <Title level={4} className={styles.categoryTitle}>
                {category.label}
              </Title>
              <Paragraph type="secondary">
                {CATEGORY_BLURB[category.key]}
              </Paragraph>
              <ul className={styles.categoryPages}>
                {category.pages.slice(0, 5).map((page) => (
                  <li key={page.slug}>
                    <Link to={pagePath(category, page)}>{page.title}</Link>
                  </li>
                ))}
                {category.pages.length > 5 && (
                  <li className={styles.more}>
                    + {category.pages.length - 5} more in the menu
                  </li>
                )}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3} className={styles.sectionTitle}>
        The road so far
      </Title>
      <Card variant="borderless" className={styles.timelineCard}>
        <Timeline
          items={timeline.map((item, i) => ({
            key: item.id,
            color: i === 0 ? "green" : "blue",
            content: (
              <div className={styles.job}>
                <Text type="secondary" className={styles.period}>
                  {item.period}
                </Text>
                <Title level={5} className={styles.jobTitle}>
                  {item.place} <Text type="secondary">· {item.role}</Text>
                </Title>
                <Paragraph className={styles.story}>{item.story}</Paragraph>
                <ul className={styles.gains}>
                  {item.gains.map((gain) => (
                    <li key={gain}>{gain}</li>
                  ))}
                </ul>
                <div className={styles.tags}>
                  {item.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
}
