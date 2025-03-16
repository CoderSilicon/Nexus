import { ResumeSchemaVals } from "./FormSchema";

export interface EditorFormProps {
  resumeData: ResumeSchemaVals;
  setResumeData: (data: ResumeSchemaVals) => void;
}
