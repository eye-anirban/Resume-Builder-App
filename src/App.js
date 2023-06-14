import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPencilAlt, faToggleOn, faToggleOff, faInfoCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const sectionList = [
  { id: 1, name: 'Profile Summary', displayTitle: true, description: 'A summary of your professional profile and key qualifications.' },
  { id: 2, name: 'Academic and Co-Curricular Achievements', displayTitle: true, description: 'Highlight your academic accomplishments and involvement in extracurricular activities.' },
  { id: 3, name: 'Summer Internship Experience', displayTitle: true, description: 'Details of your experience and projects during summer internships.' },
  { id: 4, name: 'Work Experience', displayTitle: true, description: 'Outline your previous work positions and responsibilities.' },
  { id: 5, name: 'Projects', displayTitle: true, description: 'Showcase the projects you have worked on and their outcomes.' },
  { id: 6, name: 'Certifications', displayTitle: true, description: 'List the certifications and qualifications you have achieved.' },
  { id: 7, name: 'Leadership Positions', displayTitle: true, description: 'Highlight any leadership roles you have held and the impact you made.' },
  { id: 8, name: 'Extracurricular', displayTitle: true, description: 'Discuss your involvement in extracurricular activities outside of academics and work.' },
  { id: 9, name: 'Education', displayTitle: true, description: 'Provide details about your educational background and qualifications.' },
];

const App = () => {
  const [sections, setSections] = useState(sectionList);
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionName, setEditSectionName] = useState('');

  const handleDragDrop = (dragIndex, dropIndex) => {
    const updatedSections = [...sections];
    const [draggedSection] = updatedSections.splice(dragIndex, 1);
    updatedSections.splice(dropIndex, 0, draggedSection);
    setSections(updatedSections);
  };

  const handleEditSectionName = (sectionId, newName) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setSections(updatedSections);
    setEditSectionId(null);
    setEditSectionName('');
  };

  const handleToggleSectionTitle = sectionId => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, displayTitle: !section.displayTitle };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved!');
  };

  return (
    <div className="app-container">
      <div className="content">
        <h2 className="section-heading">SELECT YOUR SECTION</h2>
        <div className="section-container">
          {sections.map(section => (
            <div key={section.id} className={`section ${section.displayTitle ? '' : 'section-inactive'}`}>
              <div className="section-header">
                <div className="left-buttons">
                  <button
                    draggable
                    onDragStart={e => e.dataTransfer.setData('text/plain', section.id)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault();
                      const dragSectionId = +e.dataTransfer.getData('text/plain');
                      const dragIndex = sections.findIndex(section => section.id === dragSectionId);
                      const dropIndex = sections.findIndex(section => section.id === section.id);
                      handleDragDrop(dragIndex, dropIndex);
                    }}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  <FontAwesomeIcon
                    className="info-icon"
                    icon={faInfoCircle}
                    title={section.description}
                  />
                  {editSectionId === section.id ? (
                    <input
                      type="text"
                      value={editSectionName}
                      onChange={e => setEditSectionName(e.target.value)}
                    />
                  ) : (
                    <h3>{section.name}</h3>
                  )}
                </div>
                <div className="right-buttons">
                  {editSectionId === section.id ? (
                    <button onClick={() => handleEditSectionName(section.id, editSectionName)}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  ) : (
                    <button onClick={() => setEditSectionId(section.id)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                  <button onClick={() => handleToggleSectionTitle(section.id)}>
                    <FontAwesomeIcon icon={section.displayTitle ? faToggleOn : faToggleOff} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="save-changes-button">
          <button onClick={handleSaveChanges}>Save and Next</button>
        </div>
      </div>
    </div>
  );
};

export default App;
