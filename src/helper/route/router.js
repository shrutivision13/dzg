import Person4Icon from "@mui/icons-material/Person4";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddBoxIcon from '@mui/icons-material/AddBox';
export let route = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Benutzer", path: "/user", icon: <Person4Icon /> },
  { name: "Formular erstellen", path: "/form", icon: <DynamicFormIcon /> },
  { name: "Formularliste", path: "/pdf", icon: <ViewDayIcon /> },
  { name: "Storno/Archivliste", path: "/archive", icon: <ArchiveIcon /> },
];