import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationalForm from "./forms/EducationalForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import SubmitForm from "./forms/SubmitForm";

export const steps: {
  key: string;
  title: string;
  component: React.ComponentType<EditorFormProps>;
}[] = [
  {
    key: "general",
    title: "General Info",
    component: GeneralInfoForm,
  },
  {
    key: "personal",
    title: "Personal Info",
    component: PersonalInfoForm,
  },
  {
    key: "work",
    title: "Work Experience",
    component: WorkExperienceForm,
  },
  {
    key: "education",
    title: "Education",
    component: EducationalForm,
  },
  {
    key: "skills",
    title: "Skills",
    component: SkillsForm,
  },
  {
    key: "links",
    title: "Summary",
    component: SummaryForm,
  },
  {
    key: "submit",
    title: "Submit",
    component: SubmitForm,
  },
];
