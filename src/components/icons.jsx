import {
  CameraOutlined,
  CodeOutlined,
  CompassOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons'

// Registry entries name their icon with a plain string so the registry
// stays a data file; this maps the name to the component.
const ICONS = {
  camera: CameraOutlined,
  code: CodeOutlined,
  compass: CompassOutlined,
  translation: TranslationOutlined,
  user: UserOutlined,
}

export function CategoryIcon({ name, ...rest }) {
  const Icon = ICONS[name] ?? CodeOutlined
  return <Icon {...rest} />
}
