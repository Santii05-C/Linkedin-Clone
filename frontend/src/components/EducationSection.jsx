import { School, X } from "lucide-react";
import { useState } from "react";
const EducationSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });

  const handleAddEducation = () => {};

  const handleDeleteEducation = () => {};

  const handleSave = () => {};

  return <div>EducationSection</div>;
};

export default EducationSection;
